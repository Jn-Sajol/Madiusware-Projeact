import React, { useEffect, useState } from "react";
import ModalOne from "./modals/ModalOne";

const Problem2 = () => {
  const [modal, setModal] = useState({
    title: "Modal Title",
    isModalOpen: false,
    contacts: [],
  });

  const toggleModal = ({ country }) => {
    if (!modal.isModalOpen) {
      setModal({
        ...modal,
        title:
          country === "all"
            ? "All country"
            : country === "us"
            ? "US Country"
            : "Modal Title",
        isModalOpen: true,
      });
    } else {
      setModal({ ...modal, title: "Modal Title", isModalOpen: false });
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          "https://contact.mediusware.com/api/contacts/"
        );
        const data = await response.json();
        setModal({ ...modal, contacts: data.results });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (modal.title === "All country") {
      getData();
    }
  }, [modal.title]);

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-lg btn-outline-primary"
              onClick={() => {
                toggleModal({
                  country: "all",
                });
              }}
              data-toggle="modal"
              data-target="#exampleModalCenter"
              type="button"
            >
              All Contacts
            </button>
            <button
              className="btn btn-lg btn-outline-warning"
              onClick={() => {
                toggleModal({
                  country: "us",
                });
              }}
              type="button"
            >
              US Contacts
            </button>
          </div>
        </div>
      </div>
      {modal.isModalOpen && (
        <Modal
          onClose={toggleModal}
          title={modal.title}
          contacts={modal.contacts}
        />
      )}
    </div>
  );
};

export default Problem2;

const Modal = ({ isOpen, onClose, title, contacts }) => {
  return (
    <div
      style={{
        textDecorationColor: "black",
      }}
    >
      <div
        class="modal-dialog modal-dialog-centered bg-primary"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              {title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                onClose();
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {contacts.map((item, index) => (
              <ContactItems key={index} item={item} />
            ))}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={onClose}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactItems = (item) => {
  console.log(item);
  return (
    <div>
      <text>id</text>
      <text>{item.item.id}</text>
      <text>phone:</text>
      <text>{item.item.phone}</text>
      <text>country:</text>
      <text>{item.item.country.name}</text>
    </div>
  );
};
