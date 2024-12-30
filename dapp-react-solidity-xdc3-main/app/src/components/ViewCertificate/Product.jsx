import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import "./Product.css";
import { Modal, ModalBody } from "react-bootstrap";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import NavBar from '../Headerr/CertificateHeader.js'
import Img from "../../image/formimg.jpg"


function Product() {
  const location = useLocation();
  const { employeeName, hash, tokencomp, tokendead, tokentask } = queryString.parse(location.search);
  // const [cookies, setCookie, removeCookie] = useCookies(["manu_sessionId"]);
  // const token = jwtDecode(cookies.manu_sessionId);
  // console.log(token);
  const [showEditProd, setShowEditProd] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const handleView = () => {
    window.open(`http://localhost:8800/listFiles?employeeName=${employeeName}&hash=${hash}`, '_self');
  };
  const handleEdit = (product) => {
    setSelectedProduct({
      ...product,
      status: product.status ? "Active" : "Inactive",
    });
    setShowEditProd(true);
  };



  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = products
    ? Math.ceil(filteredProducts.length / itemsPerPage)
    : 0;

  const handleNextPage = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  return (
    <div>
      <NavBar/>
      <br />
      <br />
     
      <br />
      <br />

      <div className="pro1" style={{marginTop:"70px"}}>
        <br />

       

        <button
          className="add-product"
          onClick={handleView}
          style={{ display: "flex", position: "relative", zIndex: "2" }}
          >
          View Certificate
        </button>
        <div style={{ position: "relative", width: "400px", height: "300px", zIndex: "1" }}>
          <img src={Img} style={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
position: "absolute", left: "60px", top: "0", width: "100%", height: "100%", objectFit: "cover", filter: "blur(2px)" }} />
        </div>
        <div className="table-containeerr">
  <table className="tableerr" style={{ position:"relative",left:"-60px",width: "400px", height:"300px",boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)" }}>
    <tbody>
      <tr style={{border:"none"}}>
        <td className="question-cell">
          <b className="question-tag">Name:</b>
        </td>
        <td className="answer-cell">
          <span className="answer-text">{employeeName}</span>
        </td>
      </tr>
      <tr>
        <td className="question-cell">
          <b className="question-tag">Company:</b>
        </td>
        <td className="answer-cell">
          <span className="answer-text">{tokencomp}</span>
        </td>
      </tr>
      <tr>
        <td className="question-cell">
          <b className="question-tag">Task:</b>
        </td>
        <td className="answer-cell">
          <span className="answer-text">{tokentask}</span>
        </td>
      </tr>
      <tr>
        <td className="question-cell">
          <b className="question-tag">Reward Coins:</b>
        </td>
        <td className="answer-cell">
          <span className="answer-text">{tokendead}</span>
        </td>
      </tr>
    </tbody>
  </table>
</div>

      </div>
    
    </div>
  );
}

export default Product;
