import { PlusIcon } from "@heroicons/react/20/solid";
import React, { Fragment, useEffect, useState } from "react";

import axios from "../api/axios";

import Card from "../components/card";
import CreateCategories from "../modals/CreateCategory";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategories = async () => {
        const result = await axios.get("/categories");
        setCategories(result.data);
    };
    const creation = (id = null) => {
        setSelectedCategory(
            id != null ? categories.find((x) => x.id == id) : {}
        );
    };
    const deletion = async (id) => {
        await axios.delete(`categories/${id}`);
        await fetchCategories();
    };
    const saveCategory = async (category) => {
        if (selectedCategory && Object.keys(selectedCategory).length > 0) {
            await axios.put(`categories/${category.id}`, category);
        } else {
            await axios.post(`categories`, category);
        }
        setSelectedCategory(null);
        await fetchCategories();
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <>
            <CreateCategories
                saveCategory={saveCategory}
                Category={selectedCategory}
            ></CreateCategories>
            <div className="text-center my-10 text-2xl flex justify-center gap-5">
                {"Categories"}
                <button
                    onClick={() => creation()}
                    className="inline-flex justify-center rounded-md bg-indigo-500 bg-opacity-4 px-2 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                    <PlusIcon
                        className="h-5 w-5 text-green-500 hover:text-green-300"
                        aria-hidden="true"
                    />
                </button>
            </div>
            <div className="grid grid-cols-4 gap-4 font-mono text-white text-sm text-center font-bold leading-6 bg-stripes-fuchsia rounded-lg">
                {categories.map((category) => (
                    <Card
                        id={category.id}
                        key={category.id}
                        title={category.title}
                        to={`/Tournaments/${category.id}`}
                        edit={() => creation(category.id)}
                        deletion={() => deletion(category.id)}
                    />
                ))}
            </div>
        </>
    );
};

export default Categories;
