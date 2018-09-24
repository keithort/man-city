import React, { Component } from "react";
import AdminLayout from "../../../HOC/AdminLayout";

import Fileuploader from "../../UI/uploader";
import { FormField } from "../../UI/formField";
import { validate } from "../../UI/misc";

import { db, dbPlayers, firebase } from "../../../firebase";

class AddEditPlayer extends Component {
  state = {
    playerId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    defaultImg: "",
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          label: "Player Name"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          name: "lastname_input",
          type: "text",
          label: "Player Last Name"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      number: {
        element: "input",
        value: "",
        config: {
          name: "number_input",
          type: "number",
          label: "Player Number"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      position: {
        element: "select",
        value: "",
        config: {
          name: "position_input",
          type: "select",
          label: "Player Position",
          options: [
            { key: "Keeper", value: "Keeper" },
            { key: "Defence", value: "Defence" },
            { key: "Midfield", value: "Midfield" },
            { key: "Striker", value: "Striker" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      image: {
        element: "image",
        value: "",
        validation: {
          required: true
        },
        valid: false
      }
    }
  };

  updateForm = (element, content = "") => {
    const newFormData = {
      ...this.state.formData
    };
    const newElement = { ...newFormData[element.id] };
    if (content === "") {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }
    let validateData = validate(newElement);
    newElement.valid = validateData[0];
    newElement.validationMessage = validateData[1];
    newFormData[element.id] = newElement;
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  successForm = message => {
    this.setState({
      formSuccess: message
    });
    setTimeout(() => {
      this.setState({
        formSuccess: ""
      });
    }, 2000);
  };

  successForm = message => {
    this.setState({
      formSuccess: message
    });
    setTimeout(() => {
      this.setState({
        formSuccess: ""
      });
    }, 2000);
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
      if (this.state.formType === "Edit Player") {
        db.ref(`players/${this.state.playerId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm("Updated correctly");
          })
          .catch(e => {
            this.setState({
              formError: true
            });
          });
      } else {
        dbPlayers
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push("/admin_players");
          })
          .catch(e => {
            this.setState({
              formError: true
            });
          });
      }
    } else {
      this.setState({
        formError: true
      });
    }
  };

  updateFields = (playerData, playerId, formType, defaultImg) => {
    const newFormData = { ...this.state.formData };
    for (let key in newFormData) {
      newFormData[key].value = playerData[key];
      newFormData[key].valid = true;
    }
    this.setState({
      playerId,
      formType,
      defaultImg,
      formData: newFormData
    });
  };

  componentDidMount() {
    const playerId = this.props.match.params.id;
    if (!playerId) {
      this.setState({
        formType: "Add Player"
      });
    } else {
      db.ref(`players/${playerId}`)
        .once("value")
        .then(snapshot => {
          const playerData = snapshot.val();
          firebase
            .storage()
            .ref("players")
            .child(playerData.image)
            .getDownloadURL()
            .then(url => {
              this.updateFields(playerData, playerId, "Edit Player", url);
            })
            .catch(e => {
              this.updateFields({ ...playerData, image: "" });
            });
        });
    }
  }

  resetImage = () => {
    const newFormData = { ...this.state.formData };
    newFormData["image"].value = "";
    newFormData["image"].valid = false;
    this.setState({
      defaultImg: "",
      formdata: newFormData
    });
  };

  storeFileName = filename => {
    this.updateForm({ id: "image" }, filename);
  };

  render() {
    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <div>
            <form onSubmit={event => this.submitForm(event)}>
              <div>
                <Fileuploader
                  dir="players"
                  tag={"Player Image"}
                  defaultImg={this.state.defaultImg}
                  defaultImgName={this.state.formData.image.value}
                  resetImage={() => this.resetImage()}
                  filename={filename => this.storeFileName(filename)}
                />
              </div>
              <div>
                <FormField
                  id={"name"}
                  formdata={this.state.formData.name}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div>
                <FormField
                  id={"lastname"}
                  formdata={this.state.formData.lastname}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div>
                <FormField
                  id={"number"}
                  formdata={this.state.formData.number}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div>
                <FormField
                  id={"position"}
                  formdata={this.state.formData.position}
                  change={element => this.updateForm(element)}
                />
              </div>

              <div className="success_label">{this.state.formSuccess}</div>
              {this.state.formError ? (
                <div className="error_label">Something is wrong</div>
              ) : null}

              <div className="admin_submit">
                <button onClick={event => this.submitForm(event)}>
                  {this.state.formType}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditPlayer;
