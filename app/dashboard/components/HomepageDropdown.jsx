"use client";
import { fetchHomePage } from "@/app/store/slices/sectionSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const HomepageDropdown = ({ formData, setFormData }) => {
  const dispatch = useDispatch();
  const { data: banners = [], loading } = useSelector(
    (state) => state.homePage
  );
  useEffect(() => {
    dispatch(fetchHomePage());
  }, [dispatch]);

  const buildTree = (data, parentId = null) => {
    return data
      .filter(
        (sec) =>
          String(sec.m_id || "") === String(parentId || "") &&
          sec.status === "active"
      )
      .map((sec) => ({
        ...sec,
        children: buildTree(data, sec._id),
      }));
  };

  const renderOptions = (nodes, level = 0) => {
    const colors = ["red", "green", "purple", "blue","#6a5acd"];
    const color = colors[level] || "black";
    const indent = "\u00A0".repeat(level * 4); // 4 spaces per level

    return nodes.flatMap((node) => [
      <option key={node._id} value={node._id} style={{ color }} className="fw-medium">
        {indent} {node.section_name}
      </option>,
      ...renderOptions(node.children || [], level + 1),
    ]);
  };

  const tree = buildTree(banners);

  return (
    <div className="col-md-6 mt-3">
      <div className="row items-center">
        <div className="col-md-3">
          <label>
            Parent Category <span className="text-red-600">*</span>
          </label>
        </div>
        <div className="col-md-9">
          <select
            className="form-select"
            name="m_id"
            value={formData.m_id || "0"}
            onChange={(e) => setFormData({ ...formData, m_id: e.target.value })}
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

export default HomepageDropdown;
