import React from 'react'
import { Avatar, Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import styles from "./profile.module.css";
import StarBorderSharpIcon from '@material-ui/icons/StarBorderSharp';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import ChatBubbleOutlineSharpIcon from '@material-ui/icons/ChatBubbleOutlineSharp';

export default function ProfileScreen() {
    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <div className={styles.avatar}>
                        <div style={{ display: 'flex' }}>
                            <Avatar style={{ height: '80px', width: '80px' }} src="https://cdn.chotot.com/A6pfp55J7w4zn9jCeHtDXq_BMA2gE-U_HjNtTvYA4vE/preset:uac/plain/dfd5683d6d37158e9526686e59873f97-68c9f9feba139d45901309b0e295ebaed54726a7.jpg" />
                            <h3 className={styles.title}>Alexander's Shop</h3>
                            <div style={{ display: 'flex' }}>
                                <p className={styles.follow}>154 Người theo dõi</p>
                                <p className={styles.following}>276 Người đang theo dõi</p>
                            </div>
                        </div>
                        <Button
                            style={{
                                borderRadius: 35,
                                backgroundColor: "#21b6ae",
                                padding: "10px 20px",
                                fontSize: "18px",
                                marginLeft: "110px"
                            }}
                            variant="contained"
                        >
                            Theo dõi
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div style={{ backgroundColor: 'white', height: '150px' }}>
                    <StarBorderSharpIcon style={{paddingLeft: '10px'}}/>  Đánh Giá : Chưa có đánh giá nào  <br /> 
                    <CalendarTodayIcon style={{paddingLeft: '10px'}}/>  Ngày tham gia : 30/08/2016 <br />
                    <LocationOnOutlinedIcon style={{paddingLeft: '10px'}}/>  Địa chỉ : Hồ Chí Minh , Việt Nam <br />
                    <ChatBubbleOutlineSharpIcon style={{paddingLeft: '10px'}}/>  Phản hồi chat : Thỉnh thoảng (phản hồi chậm)

                    </div>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{marginTop: '20px'}}>
                    <div style={{ backgroundColor: 'white', height: '500px' }}>
                    <h3 className={styles.title}>Tin Đã Đăng</h3>
                    <div style={{display: 'flex', borderBottom: '1px solid #eee'}}>
                         <img style={{ paddingLeft: '40px'}} src="https://cdn.chotot.com/Hj8viPk9dma6xehzaTNUvEMu2I7pBPXML9ElErm8wBY/preset:listing/plain/294349ce52a13c44265c838b5d858332-2748827991002729506.jpg" width="150" height="120"  />
                         <p className={styles.product}>KIA K3000S đời 2016 thùng mui bạt</p>  <br />
                         <p className={styles.price}>216.000.000 đ</p>
                         <p className={styles.date}>Ngày đăng tin : 20/07/2016</p>
                    </div>
                    <div style={{display: 'flex', marginTop: '15px'}}>
                         <img style={{ paddingLeft: '40px'}} src="https://cdn.chotot.com/2fKx8JWczIcqip-_PcGqxqVG0vTE364n4sbGgxGFBwg/preset:listing/plain/8a2f8c9ee9f7abcb36066df2eb13041d-2742860737663196309.jpg" width="150" height="120"  />
                         <p className={styles.product}>KIA K3000S đời 2016 thùng mui bạt</p>  <br />
                         <p className={styles.price}>216.000.000 đ</p>
                         <p className={styles.date}>Ngày đăng tin : 20/07/2016</p>
                    </div>
                    <div style={{display: 'flex', marginTop: '15px'}}>
                         <img style={{ paddingLeft: '40px'}} src="https://cdn.chotot.com/2fKx8JWczIcqip-_PcGqxqVG0vTE364n4sbGgxGFBwg/preset:listing/plain/8a2f8c9ee9f7abcb36066df2eb13041d-2742860737663196309.jpg" width="150" height="120"  />
                         <p className={styles.product}>KIA K3000S đời 2016 thùng mui bạt</p>  <br />
                         <p className={styles.price}>216.000.000 đ</p>
                         <p className={styles.date}>Ngày đăng tin : 20/07/2016</p>
                    </div>
                    </div>
                    
                </Grid>
        </div>
    )
}
