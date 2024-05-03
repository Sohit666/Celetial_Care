import { Button, Form, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { TypeAnimation } from "react-type-animation";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/register", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="authentication">
      <div
        style={{
          position: "fixed",
          top: "0px", // Adjust the top position as needed
          left: "50%", // Center horizontally
          transform: "translateX(-50%)", // Center horizontally
          textAlign: "center",
          zIndex: 9999, // Ensure it's above other content
          fontFamily:"https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap"
        }}
      >
        <TypeAnimation
          sequence={[
            "   Create Schedule...",
            2000, // wait 2s
            "   Manage Appointments...",
            2000, // wait 2s
            "   Patient Registration...",
            2000, // wait 2s
            "   Doctor Registration...",
            2000,
          ]}
          wrapper="span"
          speed={50}
          style={{
            fontSize: "3em",
            color: "Black",
            border: "2px solid black",
            backgroundColor: "white"
          }}
          repeat={Infinity}
        />
      </div>

      <div className="authentication-form card p-3">
        <h1 className="card-title">Nice To Meet U</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Button
            className="primary-button my-2 full-width-button"
            htmlType="submit"
          >
            REGISTER
          </Button>

          <Link to="/login" className="anchor mt-2">
            CLICK HERE TO LOGIN
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
