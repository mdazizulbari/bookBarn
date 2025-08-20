import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddBookForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const backendUrl = "http://localhost:8157/books"; // Change to your backend URL & port

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      id: Number(data.id),
      price: Number(data.price),
      quantity: Number(data.quantity),
      orderCount: Number(data.orderCount),
    };

    try {
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to add book");
      }

      toast.success('Book Added Successfully')
      reset();
    } catch (err) {
      alert(err.message);
    }
  };

  const inputStyle = {
    padding: "12px 16px",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #1976d2",
    backgroundColor: "#1e1e1e",
    color: "#e0e0e0",
    marginBottom: "16px",
    fontSize: "16px",
  };

  const labelStyle = {
    fontSize: "14px",
    marginBottom: "6px",
    display: "block",
    color: "#90caf9",
  };

  const errorStyle = {
    color: "#ef5350",
    fontSize: "14px",
    marginTop: "-12px",
    marginBottom: "12px",
  };

  const containerStyle = {
    maxWidth: "720px",
    margin: "40px auto",
    padding: "40px",
    borderRadius: "12px",
    backgroundColor: "#121212",
    color: "#e0e0e0",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.6)",
    fontFamily: "'Inter', sans-serif",
  };

  const headingStyle = {
    fontSize: "32px",
    fontWeight: "700",
    color: "#64b5f6",
    textAlign: "center",
    marginBottom: "32px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#1e88e5",
    color: "#fff",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "16px",
  };

  const courseOptions = [
    "Machine Learning",
    "Deep Learning",
    "AI",
    "Statistics",
    "Mathematics",
    "Networking",
    "Algorithms",
    "Operating Systems",
  ];

  const conditionOptions = ["new", "used"];

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={containerStyle}>
      <h2 style={headingStyle}>Add Book</h2>

      <label style={labelStyle}>Title</label>
      <input {...register("title", { required: "Title is required" })} style={inputStyle} />
      {errors.title && <p style={errorStyle}>{errors.title.message}</p>}

      <label style={labelStyle}>Author</label>
      <input {...register("author", { required: "Author is required" })} style={inputStyle} />
      {errors.author && <p style={errorStyle}>{errors.author.message}</p>}

      <label style={labelStyle}>Course</label>
      <select {...register("course", { required: "Course is required" })} defaultValue="" style={inputStyle}>
        <option value="" disabled>
          Select Course
        </option>
        {courseOptions.map((course) => (
          <option key={course} value={course}>
            {course}
          </option>
        ))}
      </select>
      {errors.course && <p style={errorStyle}>{errors.course.message}</p>}

      <label style={labelStyle}>Condition</label>
      <select {...register("condition", { required: "Condition is required" })} defaultValue="" style={inputStyle}>
        <option value="" disabled>
          Select Condition
        </option>
        {conditionOptions.map((cond) => (
          <option key={cond} value={cond}>
            {cond}
          </option>
        ))}
      </select>
      {errors.condition && <p style={errorStyle}>{errors.condition.message}</p>}

      <label style={labelStyle}>Image URL</label>
      <input {...register("image", { required: "Image URL is required" })} style={inputStyle} />
      {errors.image && <p style={errorStyle}>{errors.image.message}</p>}

      <label style={labelStyle}>ID</label>
      <input
        type="number"
        {...register("id", { required: "ID is required", valueAsNumber: true })}
        style={inputStyle}
      />
      {errors.id && <p style={errorStyle}>{errors.id.message}</p>}

      <label style={labelStyle}>Price</label>
      <input
        type="number"
        {...register("price", { required: "Price is required", valueAsNumber: true })}
        style={inputStyle}
      />
      {errors.price && <p style={errorStyle}>{errors.price.message}</p>}

      <label style={labelStyle}>Quantity</label>
      <input
        type="number"
        {...register("quantity", { required: "Quantity is required", valueAsNumber: true })}
        style={inputStyle}
      />
      {errors.quantity && <p style={errorStyle}>{errors.quantity.message}</p>}

      <label style={labelStyle}>Order Count</label>
      <input
        type="number"
        {...register("orderCount", { required: "Order count is required", valueAsNumber: true })}
        style={inputStyle}
      />
      {errors.orderCount && <p style={errorStyle}>{errors.orderCount.message}</p>}

      <label style={labelStyle}>Seller Name</label>
      <input {...register("sellerName", { required: "Seller name is required" })} style={inputStyle} />
      {errors.sellerName && <p style={errorStyle}>{errors.sellerName.message}</p>}

      <label style={labelStyle}>Location</label>
      <input {...register("location", { required: "Location is required" })} style={inputStyle} />
      {errors.location && <p style={errorStyle}>{errors.location.message}</p>}

      <label style={labelStyle}>Book Description</label>
      <textarea
        {...register("bookDescription", { required: "Description is required" })}
        rows={4}
        style={{ ...inputStyle, resize: "vertical" }}
      />
      {errors.bookDescription && <p style={errorStyle}>{errors.bookDescription.message}</p>}

      <button type="submit" style={buttonStyle}>
        Submit Book
      </button>
    </form>
  );
};

export default AddBookForm;
