import React from "react";
import "../AssetmentList/AssetsmentList.css";
import { Button } from "antd";
function AssetsmentList() {
  return (
    <>
      <div className="container-assetsmentlist">
        <div className="container">
          <div className="row">
            {/* BEGIN INVOICE */}
            <div className="col-xs-12">
              <div className="grid invoice">
                <div className="grid-body">
                  <div className="invoice-title">
                    <div className="row">
                      <div className="col-xs-12">
                        <img src="../src/image/logo.png" alt="" />
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-xs-12">
                        <h2>
                          Hóa Đơn
                          <br />
                          <span className="small">Đơn hàng #1082</span>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-xs-6">
                      <address>
                        <strong>Người Nhận:</strong>
                        <br />
                        Twitter, Inc.
                        <br />
                        795 Folsom Ave, Suite 600
                        <br />
                        San Francisco, CA 94107
                        <br />
                        <abbr title="Phone">ĐT:</abbr> (123) 456-7890
                      </address>
                    </div>
                    <div className="col-xs-6 text-right">
                      <address>
                        <strong>Người Gửi:</strong>
                        <br />
                        Elaine Hernandez
                        <br />
                        P. Sherman 42,
                        <br />
                        Wallaby Way, Sydney
                        <br />
                        <abbr title="Phone">ĐT:</abbr> (123) 345-6789
                      </address>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-6">
                      <address>
                        <strong>Phương Thức Thanh Toán:</strong>
                        <br />
                        Visa ending **** 1234
                        <br />
                        h.elaine@gmail.com
                        <br />
                      </address>
                    </div>
                    <div className="col-xs-6 text-right">
                      <address>
                        <strong>Ngày Đặt Hàng:</strong>
                        <br />
                        17/06/14
                      </address>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <h3>Tóm Tắt Đơn Hàng</h3>
                      <table className="table table-striped">
                        <thead>
                          <tr className="line">
                            <td>
                              <strong>#</strong>
                            </td>
                            <td className="text-center">
                              <strong>Dịch vụ</strong>
                            </td>
                            <td className="text-center">
                              <strong>Số lượng</strong>
                            </td>
                            <td className="text-right">
                              <strong>Giá</strong>
                            </td>
                            <td className="text-right">
                              <strong>Tổng</strong>
                            </td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>
                              <strong>Giám định kim cương</strong>
                            </td>
                            <td className="text-center">1</td>
                            <td className="text-right">$100</td>
                            <td className="text-right">$100</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>
                              <strong>Đánh bóng</strong>
                            </td>
                            <td className="text-center">2</td>
                            <td className="text-right">$50</td>
                            <td className="text-right">$100</td>
                          </tr>
                          <tr className="line">
                            <td>3</td>
                            <td>
                              <strong>Vệ sinh</strong>
                            </td>
                            <td className="text-center">1</td>
                            <td className="text-right">$30</td>
                            <td className="text-right">$30</td>
                          </tr>
                          <tr>
                            <td colSpan={3} />
                            <td className="text-right">
                              <strong>Thuế (10%)</strong>
                            </td>
                            <td className="text-right">$23</td>
                          </tr>
                          <tr>
                            <td colSpan={3} />
                            <td className="text-right">
                              <strong>Giảm giá</strong>
                            </td>
                            <td className="text-right">-$10</td>
                          </tr>
                          <tr>
                            <td colSpan={3} />
                            <td className="text-right">
                              <strong>Thành tiền</strong>
                            </td>
                            <td className="text-right">
                              <strong>$243</strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* END INVOICE */}
          </div>
        </div>
        <Button type="primary" htmlType="submit">
          Tiếp Tục
        </Button>
      </div>
    </>
  );
}

export default AssetsmentList;
