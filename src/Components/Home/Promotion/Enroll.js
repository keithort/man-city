import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import { FormField } from "../../UI/formField";
import { validate } from "../../UI/misc";
import { dbPromotions } from "../../../firebase";

class Enroll extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email address"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        validationMessage: ""
      }
    }
  };

  updateForm = element => {
    const newFormData = {
      ...this.state.formData
    };
    const newElement = { ...newFormData[element.id] };
    newElement.value = element.event.target.value;
    let validateData = validate(newElement);
    newElement.valid = validateData[0];
    newElement.validationMessage = validateData[1];
    newFormData[element.id] = newElement;
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (formIsValid) {
      dbPromotions
        .orderByChild("email")
        .equalTo(dataToSubmit.email)
        .once("value")
        .then(snapshot => {
          if (snapshot.val() === null) {
            dbPromotions.push(dataToSubmit);
            this.resetFormSuccess(true);
          } else {
            this.resetFormSuccess(false);
          }
        });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  successMessage = () => {
    setTimeout(() => {
      this.setState({
        successMessage: ""
      });
    }, 2500);
  };

  resetFormSuccess = type => {
    const newFormData = { ...this.state.formData };

    for (let key in this.state.formData) {
      newFormData[key].value = "";
      newFormData[key].valid = false;
      newFormData[key].validationMessage = false;
    }
    this.setState({
      formError: false,
      formData: newFormData,
      formSuccess: type ? "Congratulations" : "Email already entered"
    });
    this.successMessage();
  };

  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={event => this.submitForm(event)}>
            <div className="enroll_title">Enter Your Email Address</div>
            <div className="enroll_input">
              <FormField
                id={"email"}
                formdata={this.state.formData.email}
                change={element => this.updateForm(element)}
              />
              {this.state.formError ? (
                <div className="error_label">
                  Something is wrong. Try again.
                </div>
              ) : null}
              <div className="success_label">{this.state.formSuccess}</div>
              <button onClick={event => this.submitForm(event)}>Enter</button>
            </div>
            <div className="enroll_discl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              facilisis tristique purus ac laoreet.
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;
