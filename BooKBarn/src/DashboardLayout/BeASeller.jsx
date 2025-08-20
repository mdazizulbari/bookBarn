import axios from "axios";
import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProviders";

const BeASeller = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const locationData = useLoaderData(); // 👈 using loader for service centers
  const [region, setRegion] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const regions = [...new Set(locationData.map((item) => item.region))];
  const districts = locationData
    .filter((item) => item.region === region)
    .map((item) => item.city);

  const onSubmit = async (data) => {
    const sellerData = {
      ...data,
      name: user.displayName || "Anonymous", // Fallback if displayName is null
      email: user.email,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    try {
      // Step 1: Post seller application
      // const postRes = await axios.post(
      //   "http://localhost:5000/sellers",
      //   sellerData
      // );
      // if (postRes.data.insertedId) {
      // Step 2: Patch user role to "seller"
      const patchRes = await axios.patch(
        `http://localhost:8157/users/${user.email}`,
        {
          role: "seller",
        }
      );

      if (patchRes.data.message === "User role updated successfully") {
        Swal.fire(
          "✅ Success",
          "Seller application submitted and role updated!",
          "success"
        );
        reset(); // Assuming reset is from react-hook-form
      } else {
        Swal.fire(
          "⚠️ Warning",
          "Application submitted, but role update failed",
          "warning"
        );
        // }
      }
    } catch (err) {
      console.error("Error:", err);
      Swal.fire(
        "❌ Error",
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-200 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Be A Book Seller</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name & Email */}
        {/* <div>
          <label className="label">Name</label>
          <input
            type="text"
            defaultValue={user.displayName}
            readOnly
            className="input input-bordered w-full cursor-not-allowed"
          />
        </div> */}
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            defaultValue={user.email}
            readOnly
            className="input input-bordered w-full cursor-not-allowed"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Age */}
          <div className="">
            <label className="label">Age</label>
            <input
              type="number"
              {...register("age", { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter your age"
            />
            {errors.age && (
              <p className="text-error text-sm">Age is required</p>
            )}
          </div>

          {/* Post Code */}
          <div>
            <label className="label">Post Code</label>
            <input
              type="number"
              {...register("post-code", { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter Post Code"
            />
            {errors.nid && (
              <p className="text-error text-sm">Post Code is required</p>
            )}
          </div>
        </div>

        {/* Region & District */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Region</label>
            <select
              {...register("region", { required: true })}
              className="select select-bordered w-full"
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="" disabled selected>
                Choose region
              </option>
              {regions.map((reg, i) => (
                <option key={i} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
            {errors.region && (
              <p className="text-error text-sm">Region is required</p>
            )}
          </div>

          <div>
            <label className="label">District</label>
            <select
              {...register("district", { required: true })}
              className="select select-bordered w-full"
              disabled={!region}
            >
              <option value="" disabled selected>
                Choose district
              </option>
              {districts.map((city, i) => (
                <option key={i} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-error text-sm">District is required</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="label">Phone Number</label>
          <input
            type="tel"
            {...register("phone", { required: true })}
            className="input input-bordered w-full"
            placeholder="01XXXXXXXXX"
          />
          {errors.phone && (
            <p className="text-error text-sm">Phone number is required</p>
          )}
        </div>

        {/* NID */}
        <div>
          <label className="label">National ID Number</label>
          <input
            type="number"
            {...register("nid", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter NID"
          />
          {errors.nid && <p className="text-error text-sm">NID is required</p>}
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button className="btn text-black bg-blue-500 w-full" type="submit">
            Submit Application 🚀
          </button>
        </div>
      </form>
    </div>
  );
};

export default BeASeller;
