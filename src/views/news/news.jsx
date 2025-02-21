import React from "react";
import newJson from "../../news.json";
import { CCol, CTable, CPagination, CPaginationItem } from "@coreui/react";
import { useState } from "react";
import ReactDOMServer from "react-dom/server";

const itemsPerPage = 5;

const item = newJson.map((newJ, index) => ({
  name: <div style={{ maxWidth: "200px" }}>{newJ.name}</div>,
  date: newJ.date,
  category: newJ.category,
  desc: (
    <div
      style={{
        maxWidth: "500px",
        maxHeight: "100px",
        overflow: "auto",
        border: "1px solid #ccc",
        padding: "5px",
      }}
    >
      {newJ.desc}
    </div>
  ),
  image: (
    <img
      src={newJ.image}
      alt="News Image"
      style={{ width: "300px", height: "auto" }}
    />
  ),
}));

const columns = [
  {
    key: "name",
    label: "Tên tin tức",
    _props: { scope: "col" },
  },
  {
    key: "date",
    label: "Ngày tin tức",
    _props: { scope: "col" },
  },
  {
    key: "category",
    label: "Loại tin tức",
    _props: { scope: "col" },
  },
  {
    key: "desc",
    label: "Chi tiết tin tức",
    _props: { scope: "col" },
  },
  {
    key: "image",
    label: "Ảnh tin tức",
    _props: { scope: "col" },
  },
];

function news() {
  const [currentPage, setCurrentPage] = useState(1);
  const [find, setFind] = useState("");
  const parseString = (element) => {
    return typeof element === "string"
      ? element
      : ReactDOMServer.renderToStaticMarkup(element);
  };

  const filteredItems = find
    ? item.filter((newJson) => {
        const nameText = parseString(newJson.name);
        const categoryText = parseString(newJson.category);
        return (
          nameText.toLowerCase().includes(find.toLowerCase()) ||
          categoryText.toLowerCase().includes(find.toLowerCase())
        );
      })
    : item;

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const display = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div>
        <h1>Danh sách tin tức</h1>
        <input
          type="text"
          placeholder="Tìm kiếm tin tức..."
          value={find}
          onChange={(e) => setFind(e.target.value)}
        />
      </div>
      <CCol>
        <CTable hover className="mt-3" columns={columns} items={display} />
      </CCol>

      {/* Pagination */}
      <CPagination align="center" className="mt-3">
        <CPaginationItem
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          &laquo;
        </CPaginationItem>

        {[...Array(totalPages)].map((_, index) => (
          <CPaginationItem
            key={index}
            active={index + 1 === currentPage}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </CPaginationItem>
        ))}

        <CPaginationItem
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          &raquo;
        </CPaginationItem>
      </CPagination>
    </>
  );
}

export default news;
