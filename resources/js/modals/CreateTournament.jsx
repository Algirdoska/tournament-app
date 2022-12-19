import { map } from "lodash";
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

export default function CreateTournament({
    Tournament,
    saveTournament,
    Teams,
    SetSelectedTeams,
    SelectedTeam,
}) {
    const [tournament, setTournament] = useState(
        Tournament || {
            Tournament: {
                name: "",
            },
        }
    );
    const [isOpen, setIsOpen] = useState(Tournament != null);
    const cancel = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        setIsOpen(Tournament != null);
        console.log(Tournament);
        setTournament(
            Tournament || {
                Tournament: {
                    name: "",
                },
            }
        );
    }, [Tournament]);

    return (
        <div>
            <Modal
                isOpen={isOpen}
                // toggle={this.props.toggleNewStudentModal}
            >
                {/* <ModalHeader toggle={this.props.toggleNewStudentModal}>
                    Create new Category
                </ModalHeader> */}
                <ModalBody>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={tournament.name}
                            onChange={(e) =>
                                setTournament({
                                    ...tournament,
                                    name: e.target.value,
                                })
                            }
                        />
                        <Label for="teams">Teams</Label>
                        <Input
                            id="teams"
                            name="teams"
                            value={SelectedTeam}
                            multiple
                            type="select"
                            onChange={(e) => {
                                const value = Array.from(
                                    e.target.selectedOptions,
                                    (option) => option.value
                                );
                                SetSelectedTeams(value);
                            }}
                        >
                            {Teams.map((team) => (
                                <option key={team.id} value={team.id}>
                                    {team.name}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => saveTournament(tournament)}
                    >
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
