import React from 'react';
import styles from "./product-detail.module.css";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function ProductDetail() {
    return (
        <div>
            <div className={styles.content_detail}>
                <img className={styles.detail_img} src="https://vn-live-05.slatic.net/p/75866c0218e663db2ce64b62020e94a2.jpg_720x720q80.jpg_.webp" alt="" />
                <div>
                    <h2>iPhone 12 Pro Max 128GB Gold</h2>
                    <p className={styles.description}>Sự khác biệt với bộ đôi 4/4s nằm ở phần mặt kính của iPhone 12 Pro Max được làm cong nhẹ, giúp ôm khít khung viền hoàn hảo tạo sự liền mạch của màn hình khi cầm nắm sử dụng.</p>
                    <div style={{ display: 'flex', borderBottom: '1px solid black', height: '40px', marginLeft: '15px', marginTop: '-20px' }}>
                        <a className={styles.rating}>59 ratings</a>
                        <a className={styles.rating}>1 Answered Questions</a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16" className={styles.heart}>
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                        </svg>
                    </div>
                    <div style={{ display: 'flex', marginTop: '-20px' }}>
                        <h3 className={styles.price}>255.00000 $</h3>
                        <a className={styles.exchange}>Want to exchange ? </a>
                    </div>
                    <Button className={styles.cartbtn} variant="danger">Add To Cart</Button>

                </div>
                <div>
                    <h1 className={styles.title}>Delivery Details</h1> <br />
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16" className={styles.location}>
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    </svg>
                    <p className={styles.address}>Phạm Ngũ Lão, Quận 1</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16" className={styles.ship}>
                        <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                    <p className={styles.delivery}>Standard Delivery</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16" className={styles.cash}>
                        <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" />
                        <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
                        <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
                        <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
                    </svg>
                    <p className={styles.cashon}>Cash on Delivery</p>
                </div>
            </div>
            <div className={styles.be_comment_block}>
                <h1 className={styles.comments_title}>Comments (3)</h1>
                <div className={styles.be_comment} >
                    <span className={styles.be_comment_name}>
                        <a>Ravi Sah</a>
                        <a className={styles.clock}>May 27, 2015 at 3:14am</a>

                    </span>
                    <div className={styles.be_img_comment}>
                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className={styles.be_ava_comment} />
                        <p className={styles.be_comment_text}>Pellentesque gravida tristique ultrices. Sed blandit varius mauris, vel volutpat urna hendrerit id. Curabitur rutrum dolor gravida turpis tristique efficitur.</p>
                    </div>
                </div>
                <div className={styles.be_comment} >
                    <span className={styles.be_comment_name}>
                        <a>Phoenix, the Creative Studio</a>
                        <a className={styles.clock}>May 27, 2015 at 3:14am</a>

                    </span>
                    <div className={styles.be_img_comment}>
                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" className={styles.be_ava_comment} />
                        <p className={styles.be_comment_text}>Pellentesque gravida tristique ultrices. Sed blandit varius mauris, vel volutpat urna hendrerit id. Curabitur rutrum dolor gravida turpis tristique efficitur.</p>
                    </div>
                </div>
                <div className={styles.be_comment} >
                    <span className={styles.be_comment_name}>
                        <a>Cüneyt ŞEN</a>
                        <a className={styles.clock}>May 27, 2015 at 3:14am</a>

                    </span>
                    <div className={styles.be_img_comment}>
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" className={styles.be_ava_comment} />
                        <p className={styles.be_comment_text}>Pellentesque gravida tristique ultrices. Sed blandit varius mauris, vel volutpat urna hendrerit id. Curabitur rutrum dolor gravida turpis tristique efficitur.</p>
                    </div>
                </div>
            </div>
            <Form>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="name@example.com" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Leave A Comment</Form.Label>
    <Form.Control as="textarea" rows={3} />
  </Form.Group>
  <Button className={styles.commentbtn} variant="primary">Submit</Button>

</Form>
        </div>
    )
}
