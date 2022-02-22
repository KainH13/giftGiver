import React, { useState } from "react";

const GiftCardForm = (props) => {
  const { card, setCard, onSubmitAction, errors, action, deleteAction } = props;

  // store and set label for new fields
  const [newLabel, setNewLabel] = useState("");

  // string field change handler
  const onChangeHandler = (e) => {
    let editedCard = {...card};
    editedCard[e.target.name] = e.target.value;
    setCard(editedCard);
  };

  // customField change handler
  const customFieldChangeHandler = (e) => {
    let editedCard = { ...card };
    // need to find the right custom field to edit
    for (let i = 0; i < editedCard.customFields.length; i++) {
      if (editedCard.customFields[i].label === e.target.name) {
        editedCard.customFields[i].body = e.target.value;
      }
    }
    setCard(editedCard);
  };

  // add blank custom field that's ready for user input
  const addCustomField = (e) => {
    let editedCard = { ...card };
    editedCard.customFields = [
      ...editedCard.customFields,
      {
        label: newLabel,
        body: "",
      },
    ];
    setCard(editedCard);
    setNewLabel("");
  };

  // remove a custom field
  const removeField = (fieldLabel) => {
    let editedCard = { ...card };
    // find field by label
    for (let i = 0; i < editedCard.customFields.length; i++) {
      if (editedCard.customFields[i].label === fieldLabel) {
        editedCard.customFields.splice(i);
      }
    }
    setCard(editedCard);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmitAction(card);
  };

  return (
    <div className="col card m-2">
      <h2 className="text-primary text-center">{action} Card</h2>
      <form onSubmit={submitHandler} className="px-3">
        <div className="row">
          <div className="col">
            <div className="form-group d-flex flex-column mb-3">
              <input
                className="form-control"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={card.firstName}
                onChange={onChangeHandler}
              />
              {errors.firstName ? (
                <div className="alert alert-danger my-1">
                  {errors.firstName.message}
                </div>
              ) : null}
            </div>
          </div>
          <div className="col">
            <div className="form-group d-flex flex-column mb-3">
              <input
                className="form-control"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={card.lastName}
                onChange={onChangeHandler}
              />
              {errors.lastName ? (
                <div className="alert alert-danger my-1">
                  {errors.lastName.message}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="form-group d-flex flex-column mb-3">
          <input
            className="form-control"
            type="text"
            name="interests"
            placeholder="Interests"
            value={card.interests}
            onChange={onChangeHandler}
          />
          {errors.interests ? (
            <div className="alert alert-danger my-1">
              {errors.interests.message}
            </div>
          ) : null}
        </div>
        {card.customFields
          ? card.customFields.map((field, index) => {
              return (
                <div className="form-group d-flex flex-column mb-3" key={index}>
                  <label htmlFor={field.label}>{field.label}</label>
                  <div className="row">
                    <div className="col-11">
                      <input
                        className="form-control"
                        type="text"
                        name={field.label}
                        value={field.body}
                        onChange={customFieldChangeHandler}
                      />
                    </div>
                    <div className="col-1">
                      <div
                        className="btn btn-outline-danger"
                        onClick={(e) => removeField(field.label)}
                      >
                        X
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
        <div className="form-group d-flex flex-column mb-3">
          <div className="row align-items-center">
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                placeholder="New Field Name"
                name="newFieldName"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
              />
            </div>
            <div className="col-2">
              <div
                className="btn btn-outline-primary my-3"
                onClick={addCustomField}
              >
                Add
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-10">
            <input
              className="btn btn-outline-primary mb-3"
              type="submit"
              value="Save"
            />
          </div>
          <div className="col-2">
            {action === "Edit" ? (
              <div className="btn btn-outline-danger" onClick={(e) => deleteAction(card)}>Delete</div>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
};

export default GiftCardForm;
