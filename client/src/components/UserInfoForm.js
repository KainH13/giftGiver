import React from "react";

const UserInfoForm = (props) => {
  const { user, setUser, onSubmitAction, errors } = props;

  // string field change handler
  const onChangeHandler = (e) => {
    let editedUser = { ...user };
    editedUser[e.target.name] = e.target.value;
    setUser(editedUser);
  };

  // customField change handler
  const customFieldChangeHandler = (e) => {
    let editedUser = { ...user };
    // need to find the right custom field to edit
    for (let i = 0; i < editedUser.customFields.length; i++) {
      if (editedUser.customFields[i].label === e.target.name) {
        editedUser.customFields[i].body = e.target.value;
      }
    }
    setUser(editedUser);
  };

  // add blank custom field that's ready for user input
  const addCustomField = (e) => {
    let editedUser = { ...user };
    editedUser.customFields = [
      ...editedUser.customFields,
      {
        label: "",
        body: "",
      },
    ];
    setUser(editedUser);
  };

  // need custom field change handler

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmitAction(user);
  };

  return (
    <div className="col card m-2">
      {console.log(user)}
      {console.log(user.firstName)}
      <h2 className="text-primary text-center">Edit User Profile</h2>
      <form onSubmit={submitHandler} className="px-3">
        <div className="form-group d-flex flex-column mb-3">
          <label htmlFor="firstName">First Name:</label>
          <input
            className="form-control"
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={onChangeHandler}
          />
          {errors.firstName ? (
            <div className="alert alert-danger my-1">
              {errors.firstName.message}
            </div>
          ) : null}
        </div>
        <div className="form-group d-flex flex-column mb-3">
          <label htmlFor="lastName">Last Name:</label>
          <input
            className="form-control"
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={onChangeHandler}
          />
          {errors.lastName ? (
            <div className="alert alert-danger my-1">
              {errors.lastName.message}
            </div>
          ) : null}
        </div>
        <div className="form-group d-flex flex-column mb-3">
          <label htmlFor="interests">Interests:</label>
          <input
            className="form-control"
            type="text"
            name="interests"
            value={user.interests}
            onChange={onChangeHandler}
          />
          {errors.interests ? (
            <div className="alert alert-danger my-1">
              {errors.interests.message}
            </div>
          ) : null}
        </div>
        {user.customFields
          ? user.customFields.map((field, index) => {
              return (
                <div className="form-group d-flex flex-column mb-3" key={index}>
                  <label htmlFor={field.label}>Interests:</label>
                  <input
                    className="form-control"
                    type="text"
                    name={field.label}
                    value={field.body}
                    onChange={customFieldChangeHandler}
                  />
                </div>
              );
            })
          : null}
        <div className="form-group">
          <button
            className="btn btn-outline-primary mb-3"
            onClick={addCustomField}
          >
            Add Custom Field
          </button>
        </div>
        <input
          className="btn btn-outline-primary mb-3"
          type="submit"
          value="Save"
        />
      </form>
    </div>
  );
};

export default UserInfoForm;
