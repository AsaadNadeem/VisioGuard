import React from "react";
import Logo from "../../../assets/images/Logo.png";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 pt-5 pb-3">
      <div className="container">
        <div className="row gy-4">
          {/* Logo */}
          <div className="col-lg-4 text-center text-lg-start">
            <img
              src={Logo}
              alt="VisioGuard"
              style={{ width: "90px" }}
              className="mb-3"
            />
          </div>

          {/* Social */}
          <div className="col-lg-4 d-flex flex-column text-center justify-content-center">
            <h5 className="fw-bold mb-3">Connect</h5>

            <div className="d-flex justify-content-center gap-4">
              <a
                href="https://github.com/AsaadNadeem"
                target="_blank"
                rel="noreferrer"
                className="text-light fs-4"
              >
                <FaGithub />
              </a>

              <a
                href="https://linkedin.com/in/asaadnadeem686"
                target="_blank"
                rel="noreferrer"
                className="text-light fs-4"
              >
                <FaLinkedin />
              </a>

              <a
                href="mailto:asaadnadeem686@gmail.com"
                className="text-light fs-4"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* About */}
          <div className="col-lg-4 text-center text-lg-end">
            <h5 className="fw-bold">VisioGuard</h5>

            <p className="text-secondary mb-0">
              AI-powered image moderation platform for detecting nudity,
              weapons, gore, and unsafe visual content.
            </p>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="text-center text-secondary">
          © 2026 <strong>VisioGuard</strong> • Developed by{" "}
          <strong>Asaad Nadeem</strong>. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
