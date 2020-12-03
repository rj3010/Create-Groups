/** @format */

import React, { useState, useEffect } from "react"
import axios from "axios"
import { Row, Col, Image, Button } from "react-bootstrap"
import CreateUserGroupModal from "./CreateUserGroupModal"

const cardContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
}
const cardStyle = {
  width: "150px",
  height: "170px",
  borderRadius: "7px",
  backgroundColor: "gray",
  margin: "5px",
  position: "relative",
}

const userNameStyle = {
  position: "absolute",
  bottom: "0",
  textAlign: "center",
  height: "50px",
  width: "100%",
  borderRadius: "7px",
  backgroundColor: "#4281f5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
}
const black = {
  color: "black",
}

const CreateGroupScreen = () => {
  const [users, setUsers] = useState([])
  const [show, setShow] = useState(false)
  const [groups, setGroups] = useState([])

  const appendCheckBoxes = (usersData) => {
    let userDataCopy = usersData.map((ele) => {
      return { ...ele, checked: false }
    })

    setUsers(userDataCopy)
  }
  console.log(groups)

  useEffect(() => {
    axios
      .get(
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json"
      )
      .then((res) => {
        appendCheckBoxes(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <>
      <Button
        onClick={() => setShow(true)}
        style={{ position: "fixed", margin: "5px" }}
      >
        Create Group
      </Button>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div
          style={{
            borderRadius: "10px",
            minWidth: "30%",
          }}
        >
          {groups &&
            groups.map((group) => {
              return (
                <div
                  key={group.src}
                  className="bg-light my-3 rounded shadow-lg"
                >
                  <Row className="d-flex justify-content-between flex-wrap mb-5 ">
                    <Col md={3}>
                      {group.src && (
                        <Image
                          src={group.src}
                          style={{
                            ...cardStyle,
                            position: "absolute",
                            top: "0",
                          }}
                        />
                      )}
                    </Col>
                    <Col md={3} className="pt-5">
                      <h3 style={black}>Name</h3>
                      <h3 style={black}>Description</h3>
                    </Col>
                    <Col md={6} className="pt-5">
                      <h3 style={{ borderRadius: "16px", ...black }}>
                        {group.name}
                      </h3>
                      <h3 style={{ borderRadius: "16px", ...black }}>
                        {group.description}
                      </h3>
                    </Col>
                  </Row>
                  <div style={cardContainer}>
                    {group.users &&
                      group.users.map((user) => {
                        return (
                          <div key={user.id} name={user.id} style={cardStyle}>
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

                            <div style={userNameStyle}>{user.name}</div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              )
            })}
        </div>

        <CreateUserGroupModal
          users={users}
          show={show}
          setShow={setShow}
          setUsers={setUsers}
          groups={groups}
          setGroups={setGroups}
          cardContainer={cardContainer}
          cardStyle={cardStyle}
          userNameStyle={userNameStyle}
        />
      </div>
    </>
  )
}

export default CreateGroupScreen
