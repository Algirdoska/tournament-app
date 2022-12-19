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

export default function CreateCategories({ Category, saveCategory }) {
    const [category, setCategory] = useState(
        Category || {
            Category: {
                title: "",
            },
        }
    );
    const [isOpen, setIsOpen] = useState(Category != null);
    const cancel = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        setIsOpen(Category != null);
        setCategory(
            Category || {
                Category: {
                    title: "",
                },
            }
        );
    }, [Category]);

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
                        <Label for="title">Name</Label>
                        <Input
                            id="title"
                            name="title"
                            value={category.title}
                            onChange={(e) =>
                                setCategory({
                                    ...category,
                                    title: e.target.value,
                                })
                            }
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => saveCategory(category)}
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
