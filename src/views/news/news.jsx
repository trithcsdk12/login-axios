import React, { useState } from "react";
import newJson from "../../news.json";
import {
  CButton,
  CCol,
  CContainer,
  CFormSelect,
  CImage,
  CRow,
  CTable,
} from "@coreui/react";
import { axiosClient, imageBaseUrl } from "../../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import moment from "moment";
import ReactPaginate from "react-paginate";

function News() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const [dataNews, setDataNews] = useState([]);

  const [isPermissionCheck, setIsPermissionCheck] = useState(true);

  const [dataNewsCategory, setDataNewsCategroy] = useState([]);

  const [isCollapse, setIsCollapse] = useState(false);

  const handleToggleCollapse = () => {
    setIsCollapse((prevState) => !prevState);
  };

  const handleSearch = (keyword) => {
    fetchDataNews(keyword)
  }

  //pagination state
  const [pageNumber, setPageNumber] = useState(1);

  // search input
  const [dataSearch, setDataSearch] = useState("");

  const fetchDataNewsCategory = async () => {
    try {
      const response = await axiosClient.get(`admin/news-category`);
      if (response.data.status === true) {
        setDataNewsCategroy(response.data.list);
      }
    } catch (error) {
      console.error("Fetch data news is error", error);
    }
  };

  useEffect(() => {
    fetchDataNewsCategory();
  }, []);

  const handlePageChange = ({ selected }) => {
    const newPage = selected + 1;
    if (newPage < 2) {
      setPageNumber(newPage);
      window.scrollTo(0, 0);
      return;
    }
    window.scrollTo(0, 0);
    setPageNumber(newPage);
  };

  const fetchDataNews = async (dataSearch = "") => {
    try {
      const response = await axiosClient.get(
        `admin/news?data=${dataSearch}&page=${pageNumber}&category=${selectedCategory}`
      );

      if (response.data.status === true) {
        setDataNews(response.data.list);
      }

      if (
        response.data.status === false &&
        response.data.mess == "no permission"
      ) {
        setIsPermissionCheck(false);
      }
    } catch (error) {
      console.error("Fetch promotion news data is error", error);
    }
  };

  const items =
    dataNews?.data && dataNews?.data?.length > 0
      ? dataNews?.data.map((item) => ({
          title: (
            <div
              className="title-color"
              style={{
                width: 300,
              }}
            >
              {item?.news_desc?.title}
            </div>
          ),
          image: (
            <CImage
              className="border"
              src={`${imageBaseUrl}${item.picture}`}
              alt={`Ảnh tin k/m ${item?.news_desc?.id}`}
              width={100}
              height={80}
              loading="lazy"
            />
          ),
          cate: (
            <div className="cate-color">
              {item?.category_desc?.[0].cat_name}
            </div>
          ),
          info: (
            <div>
              <span>{item?.views} lượt xem</span>
              <div>{moment.unix(item?.date_post).format("DD-MM-YYYY")}</div>
            </div>
          ),
          _cellProps: { id: { scope: "row" } },
        }))
      : [];

  const columns = [
    {
      key: "title",
      label: "Tiêu đề",
      _props: { scope: "col" },
    },
    {
      key: "image",
      label: "Hình ảnh",
      _props: { scope: "col" },
    },
    {
      key: "cate",
      label: "Danh mục",
      _props: { scope: "col" },
    },
    {
      key: "info",
      label: "Thông tin",
      _props: { scope: "col" },
    },
  ];

  useEffect(() => {
    fetchDataNews();
  }, [pageNumber, selectedCategory]);

  const uniqueCategories = [...new Set(newJson.map((newp) => newp.category))];

  return (
    <>
      <CContainer>
        {!isPermissionCheck ? (
          <h5>
            <div>
              Bạn không đủ quyền để thao tác trên danh mục quản trị này.
            </div>
            <div className="mt-4">
              Vui lòng quay lại trang chủ{" "}
              <Link to={"/dashboard"}>(Nhấn vào để quay lại)</Link>
            </div>
          </h5>
        ) : (
          <>
            <CRow className="mb-3">
              <CCol>
                <h3>QUẢN LÝ TIN TỨC</h3>
              </CCol>
              <CCol md={6}>
                <div className="d-flex justify-content-end">
                </div>
              </CCol>
            </CRow>

            <CRow>
              <CCol>
                <table className="filter-table">
                  <thead>
                    <tr>
                      <th colSpan="2">
                        <div className="d-flex justify-content-between">
                          <span>Bộ lọc tìm kiếm</span>
                          <span
                            className="toggle-pointer"
                            onClick={handleToggleCollapse}
                          >
                            {isCollapse ? "▼" : "▲"}
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  {!isCollapse && (
                    <tbody>
                      <tr>
                        <td>Tổng cộng</td>
                        <td className="total-count">{dataNews?.total}</td>
                      </tr>
                      <tr>
                        <td>Lọc theo vị trí</td>
                        <td>
                          <CFormSelect
                            className="component-size w-50"
                            aria-label="Chọn yêu cầu lọc"
                            options={[
                              { label: "Chọn danh mục", value: "" },
                              ...(dataNewsCategory &&
                              dataNewsCategory.length > 0
                                ? dataNewsCategory.map((group) => ({
                                    label: group?.news_category_desc?.cat_name,
                                    value: group.cat_id,
                                  }))
                                : []),
                            ]}
                            value={selectedCategory}
                            onChange={(e) =>
                              setSelectedCategory(e.target.value)
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Tìm kiếm</td>
                        <td>
                          <input
                            type="text"
                            className="search-input"
                            value={dataSearch}
                            onChange={(e) => setDataSearch(e.target.value)}
                          />
                          <button
                            onClick={() => handleSearch(dataSearch)}
                            className="submit-btn"
                          >
                            Submit
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </CCol>

              <CCol md={12} className="mt-3">
                <CButton color="primary" size="sm">
                  Xóa vĩnh viễn
                </CButton>
              </CCol>

              <CCol>
                <CTable
                  hover
                  className="mt-3"
                  columns={columns}
                  items={items}
                />
              </CCol>

              <div className="d-flex justify-content-end">
                <ReactPaginate
                  pageCount={Math.ceil(dataNews?.total / dataNews?.per_page)}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={1}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  onPageChange={handlePageChange}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                  previousLabel={"<<"}
                  nextLabel={">>"}
                />
              </div>
            </CRow>
          </>
        )}
      </CContainer>
    </>
  );
}

export default News;
