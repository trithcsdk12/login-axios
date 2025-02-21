import React, { useState } from "react";
import newJson from "../../news.json";
import { CCol, CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell, CPagination, CPaginationItem } from "@coreui/react";
import ReactDOMServer from "react-dom/server";

const itemsPerPage = 5;

const items = newJson.map((newJ, index) => ({
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

function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const [find, setFind] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const parseString = (element) => {
    return typeof element === "string"
      ? element
      : ReactDOMServer.renderToStaticMarkup(element);
  };

  const filteredItems = items.filter((item) => {
    const nameText = parseString(item.name);
    const categoryText = parseString(item.category);
    const matchesSearch = nameText.toLowerCase().includes(find.toLowerCase()) || categoryText.toLowerCase().includes(find.toLowerCase());
    const matchesCategory = selectedCategory ? categoryText === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const display = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Lấy danh sách các loại tin tức duy nhất
  const uniqueCategories = [...new Set(newJson.map((newp) => newp.category))];

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
        <p>Bộ lọc tìm kiếm</p>
        <p>Tổng cộng: {newJson.length}</p>
        <p>Lọc theo loại tin tức</p>
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenuButton2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedCategory || "Chọn loại tin tức"}
          </button>
          <ul
            className="dropdown-menu dropdown-menu-dark"
            aria-labelledby="dropdownMenuButton2"
          >
            <li>
              <a className="dropdown-item" href="#" onClick={() => setSelectedCategory("")}>
                Tất cả
              </a>
            </li>
            {uniqueCategories.map((category, index) => (
              <li key={index}>
                <a className="dropdown-item" href="#" onClick={() => setSelectedCategory(category)}>
                  {parseString(category)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <CCol>
        <CTable hover className="mt-3">
          <CTableHead>
            <CTableRow>
              {columns.map((column) => (
                <CTableHeaderCell key={column.key} {...column._props}>
                  {column.label}
                </CTableHeaderCell>
              ))}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {display.map((item, index) => (
              <CTableRow key={index}>
                {columns.map((column) => (
                  <CTableDataCell key={column.key}>
                    {item[column.key]}
                  </CTableDataCell>
                ))}
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
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

export default News;
