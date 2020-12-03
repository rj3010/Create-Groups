/** @format */

import React, { useState } from "react"
import { Modal, Image, Form, Row, Col, Dropdown, Button } from "react-bootstrap"
import { FaRegUser, FaCheck, FaCamera } from "react-icons/fa"

const checkStyle = {
    position: "absolute",
    top: "0",
    right: "0",
    width: "30px",
    height: "30px",
    backgroundColor: "#4281f5",
    color: "white",
    padding: "5px",
    borderRadius: "0 7px 0 0",
  }

const CreateUserGroupModal = ({
  users,
  show,
  setShow,
  setUsers,
  groups,
  setGroups,
  cardStyle,
  cardContainer,
  userNameStyle

}) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [src, setSrc] = useState("")

  const toggleClick = (event, id) => {
    let checkedUsers = users.map((user) => {
      if (user.id === id) {
        return { ...user, checked: !user.checked }
      }
      return user
    })
    setUsers(checkedUsers)
  }

  const sortUsers = (event) => {
    let updatedUsers = [...users]
    if (event.target.id === "asc") {
      updatedUsers.sort((a, b) => {
        if (a.name.toUpperCase() < b.name.toUpperCase()) {
          return -1
        } else if (a.name.toUpperCase > b.name.toUpperCase()) {
          return 1
        } else {
          return 0
        }
      })
    }
    if (event.target.id === "dsc") {
      updatedUsers.sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return -1
        } else if (a.name.toUpperCase < b.name.toUpperCase()) {
          return 1
        } else {
          return 0
        }
      })
    }

    setUsers(updatedUsers)
  }

  const handleChangeFile = (event) => {
    let file = event.target.files[0]
    const reader = new FileReader()

    reader.addEventListener(
      "load",
      function () {
        // convert image file to base64 string
        setSrc(reader.result)
      },
      false
    )
    if (file) {
      reader.readAsDataURL(file)
      console.log(reader.result)
    }
  }

  const createGroup = () => {
    let selectedUsers = users.filter((user) => user.checked === true)
    const group = {
      name: name,
      description: description,
      src: src,
      users: [...selectedUsers],
    }

    setGroups([...groups, { ...group }])
    setShow(false)
  }

  return (
    <div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="lg"
        scrollable="true"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Group</Modal.Title>
          <Dropdown className="ml-auto">
            <Dropdown.Toggle variant="info" id="dropdown-basic">
              Sort Users
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item id="asc" onClick={sortUsers}>
                Ascending
              </Dropdown.Item>
              <Dropdown.Item id="dsc" onClick={sortUsers}>
                Descending
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Header>
        <Modal.Body>
          <Row className="d-flex justify-content-between flex-wrap mb-5">
            <Col md={2}>
              <FaRegUser style={cardStyle} />

              {src && (
                <Image
                  src={src}
                  style={{ ...cardStyle, position: "absolute", top: "0" }}
                />
              )}
              <Form style={{ width: "150px", textAlign: "center" }}>
                <Form.File id="file">
                  <Form.File.Input
                    onChange={handleChangeFile}
                    style={{ visibility: "hidden", height: "0.1px" }}
                  />
                  <Form.File.Label data-browse="Button text">
                    <FaCamera
                      style={{
                        display: "inline-block",
                        margin: "0 auto",
                        width: "30px",
                        height: "30px",
                      }}
                    />
                  </Form.File.Label>
                </Form.File>
              </Form>
            </Col>
            <Col md={2} className="pt-5">
              <h3>Name</h3>
              <h3>Description</h3>
            </Col>
            <Col md={6} className="pt-5">
              <h3>
                <Form.Control
                  type="text"
                  placeholder="group name"
                  value={name}
                  style={{ borderRadius: "16px" }}
                  onChange={(event) => setName(event.target.value)}
                />
              </h3>
              <h3>
                <Form.Control
                  type="text"
                  placeholder="description"
                  value={description}
                  style={{ borderRadius: "16px" }}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </h3>
            </Col>
          </Row>
          <div style={cardContainer}>
            {users &&
              users.map((user) => {
                return (
                  <div
                    key={user.id}
                    name={user.id}
                    style={cardStyle}
                    onClick={(event) => toggleClick(event, user.id)}
                  >
                    <Image
                      style={{
                        height: "auto",
                        width: "100%",
                        maxHeight: "100%",
                        maxWidth: "100%",
                        borderRadius: "7px",
                      }}
                      src={user.Image}
                    />
                    {user.checked && <FaCheck style={checkStyle} />}
                    <div style={userNameStyle}>{user.name}</div>
                  </div>
                )
              })}
          </div>
          <Row>
            <Col className="d-flex justify-content-center">
            
              <Button
                className="my-3"
                variant="success"
                onClick={createGroup}
              >
                Create Group
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default CreateUserGroupModal
