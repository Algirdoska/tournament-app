import React, { Component, useEffect, useState } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
} from "reactstrap";

export default function CreateTeams({ Team, saveTeam }) {
    const [team, setTeam] = useState(
        Team || {
            Team: {
                name: "",
            },
        }
    );
    const [isOpen, setIsOpen] = useState(Team != null);
    const cancel = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        setIsOpen(Team != null);
        setTeam(
            Team || {
                Team: {
                    name: "",
                },
            }
        );
    }, [Team]);

    return (
        <div>
            <Modal
                isOpen={isOpen}
                // toggle={this.props.toggleNewStudentModal}
            >
                {/* <ModalHeader toggle={this.props.toggleNewStudentModal}>
                    Create new Team
                </ModalHeader> */}
                <ModalBody>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={team.name}
                            onChange={(e) =>
                                setTeam({
                                    ...team,
                                    name: e.target.value,
                                })
                            }
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => saveTeam(team)}>
                        Add
                    </Button>{" "}
                    <Button color="secondary" onClick={cancel}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
