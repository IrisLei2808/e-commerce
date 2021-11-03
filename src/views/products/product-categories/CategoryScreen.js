import React from "react";
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import styles from "./product-detail.module.css";
import Dropdown from 'react-bootstrap/Dropdown'

const CategoryScreen = ({ match, history }) => {
  return (
    <div>
      <div className={styles.search}>
        <input placeholder="categories, clothes, watch, etc, ..." type="search" />
        <div style={{ width: '45px' }}>
          <button class="btn btn-secondary" type="button" className={styles.lookup}>
            <i class="fa fa-search" style={{ color: 'white', fontSize: '23px' }}></i>
          </button>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-bag-x" viewBox="0 0 16 16" className={styles.bag}>
          <path fill-rule="evenodd" d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 0 1 0-.708z" />
          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
        </svg>
      </div>

      <img _ngcontent-nwu-c111="" src="//icms-image.slatic.net/images/ims-web/0ef10cfa-7d61-46ec-8451-77bc12633907.jpg" alt="ZLP:Stanley Black Decker" style={{
        width: '180px', height: '45px', float: 'right',
        marginRight: '-100px', marginTop: '-50px', cursor: 'pointer'
      }} />
   <div className={styles.header}>
         <div className={styles.menu}>
            <ul>
              <li><button style={{ background: '#fed100', border: 'none'}}><i class="fa fa-mobile"></i></button> iPhone Mobile</li>
              <li><button style={{ background: '#fed100', border: 'none'}}><i class="fa fa-laptop"></i></button> Asus Laptop</li>
              <li><button style={{ background: '#fed100', border: 'none'}}><i class="fa fa-headphones"></i></button> Head Phones</li>
              <li><button style={{ background: '#fed100', border: 'none'}}><i class="fa fa-podcast"></i></button> Podcast Phones</li>
              <li><button style={{ background: '#fed100', border: 'none'}}><i class="fa fa-mobile"></i></button> iPhone Mobile</li>
              <li><button style={{ background: '#fed100', border: 'none'}}><i class="fa fa-laptop"></i></button> Asus Laptop</li>
            </ul>
         </div>
      </div>


    </div>
  );
};

export default CategoryScreen;
