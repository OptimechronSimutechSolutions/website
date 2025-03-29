import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import emailjs from "emailjs-com"; // Import EmailJS
import "./Contact.css"; // Import styles
import logo from "./logo.png"; // Import the image

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  // Validation Schema
  const schema = yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    contactNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Contact number must be 10 digits")
      .required("Contact number is required"),
    services: yup.array().min(1, "You must select at least one service"),
    projectDetails: yup.string(),
    specialRequest: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const templateParams = {
      fullName: data.fullName,
      email: data.email,
      contactNumber: data.contactNumber,
      services: data.services.join(", "), // Convert array to string
      projectDetails: data.projectDetails,
      specialRequest: data.specialRequest || "No special request",
    };

    emailjs
      .send(
        "service_7y2q7vh", // Replace with your EmailJS Service ID
        "template_m98y5yb", // Replace with your EmailJS Template ID
        templateParams,
        "AHlzf85V0chpX1To4" // Replace with your EmailJS Public Key
      )
      .then(() => {
        setSubmitted(true);
        reset();
        alert("Message Sent Successfully!");
      })
      .catch((error) => {
        console.error("Email Error:", error);
        alert("Failed to send message.");
      });
  };

  return (
    <div className="contact-container">
      <div className="contact-box">
        <h1 className="contact-title">Optimechron SimuTech Solutions</h1>
        <h3>"Customized Engineering Designs as Unique as You Are"</h3>

        {submitted && (
          <p className="success-message">
            Thank you! Your message has been sent.
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
          <label className="contact-label">Full Name*</label>
          <input
            type="text"
            {...register("fullName")}
            className="contact-input"
          />
          {errors.fullName && (
            <p className="error-text">{errors.fullName.message}</p>
          )}

          <label className="contact-label">Email Address*</label>
          <input
            type="email"
            {...register("email")}
            className="contact-input"
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}

          <label className="contact-label">Contact Number*</label>
          <input
            type="text"
            {...register("contactNumber")}
            className="contact-input"
          />
          {errors.contactNumber && (
            <p className="error-text">{errors.contactNumber.message}</p>
          )}

          <label className="contact-checkbox">
            <b>Service Provide By Us</b>
            <br />
            <input
              type="checkbox"
              value="Product Drawing"
              {...register("services")}
            />{" "}
            Product Drawing <br />
            <input
              type="checkbox"
              value="Process Drawing"
              {...register("services")}
            />{" "}
            Process Drawing <br />
            <input
              type="checkbox"
              value="3D Modeling and Assembly"
              {...register("services")}
            />{" "}
            3D Modeling and Assembly <br />
            <input
              type="checkbox"
              value="Simulation"
              {...register("services")}
            />{" "}
            Simulation <br />
            <input
              type="checkbox"
              value="FEA Static Structural Analysis"
              {...register("services")}
            />{" "}
            FEA Static Structural Analysis <br />
            <input
              type="checkbox"
              value="Other"
              {...register("services")}
            />{" "}
            Other <br />
          </label>
          {errors.services && (
            <p className="error-text">{errors.services.message}</p>
          )}

          <label className="contact-label">
            Explain more on your ideas and projects?
          </label>
          <textarea
            {...register("projectDetails")}
            className="contact-textarea"
          ></textarea>
          {errors.projectDetails && (
            <p className="error-text">{errors.projectDetails.message}</p>
          )}

          <label className="contact-label">
            Special Request for Customized Engineering Design
          </label>
          <textarea
            {...register("specialRequest")}
            className="contact-textarea"
          ></textarea>

          <button type="submit" className="contact-button">
            CONTACT US
          </button>
        </form>
      </div>

      {/* Right side with contact info */}
      <div className="contact-info">
        <img src={logo} alt="Contact Us" className="contact-image" />
        <h3>General Inquiries</h3>
        <p>Have a question? Get in touch:</p>

        <h3>Optimechron SimuTech Solutions</h3>
        <p>
          <b>Dr. Darshan K. Gajjar</b> <br />
          (PhD in Machine Design) <br />
          Co-Founder
        </p>
        <p>
          <b>Dr. Harsh K. Parmar</b> <br />
          (PhD in Industrial and Systems Engineering) <br />
          Co-Founder
        </p>

        <h3>Our Email</h3>
        <p>optimechronsimutechsolutions@gmail.com</p>

        <h3>Our Location</h3>
        <p>
          India Office: Mahadev vadi Main road Near Momai Telecom, Rajkot,
          Gujarat, India
        </p>
        <p>US Office: 930 Drake Dr, Norman, Oklahoma 73071, USA</p>

        <h3>Contact Us</h3>
        <p>+91 8788549728</p>
        <p>+91 9974364458</p>
        <p>+1 8629264721</p>

        <br />
        <p>
          <b>We Appreciate Your Time – Let’s Connect Again!</b>
        </p>
      </div>
    </div>
  );
};

export default Contact;
