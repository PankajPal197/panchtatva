"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "@/app/store/slices/categorySlice";

const CategoryDropdown = ({ formData, setFormData }) => {
  const dispatch = useDispatch();
  const { data: categories = [], loading } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  // Build tree (handles null or "0" root IDs)
  const buildTree = (data, parentId = null) => {
    return data
      .filter(
        (cat) =>
          String(cat.parent_category_id || "") === String(parentId || "") &&
          cat.status === "active"
      )
      .map((cat) => ({
        ...cat,
        children: buildTree(data, cat._id),
      }));
  };

  // Render options with colors & indentation
  const renderOptions = (nodes, level = 0) => {
    const colors = ["red", "green", "purple", "pink"];
    const color = colors[level] || "black";
    const indent = "\u00A0".repeat(level * 4); // 4 spaces per level

    return nodes.flatMap((node) => [
      <option key={node._id} value={node._id} style={{ color }}>
        {indent} {node.category_name}
      </option>,
      ...renderOptions(node.children || [], level + 1),
    ]);
  };

  const tree = buildTree(categories);

  return (
    <div className="col-md-6">
      <div className="row items-center">
        <div className="col-md-3">
          <label>
            Parent Category <span className="text-red-600">*</span>
          </label>
        </div>
        <div className="col-md-9">
          <select
            className="form-select"
            name="parent_category_id"
            value={formData.parent_category_id || "0"}
            onChange={(e) =>
              setFormData({ ...formData, parent_category_id: e.target.value })
            }
          >
            <option value="0" style={{ color: "red" }}>
              Root Category
            </option>
            {renderOptions(tree)}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;
