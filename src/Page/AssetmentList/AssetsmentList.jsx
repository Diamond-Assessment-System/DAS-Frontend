import React from "react";
import "../AssetmentList/AssetsmentList.css";
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
                      <div className="col-xs-12"></div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-xs-12">
                        <h2>
                          Biên Nhận
                          <br />
                          <span className="small">Mã Biên Nhận #1082</span>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-xs-6">
                      <address>
                        <strong>Billed To:</strong>
                        <br />
                        Twitter, Inc.
                        <br />
                        795 Folsom Ave, Suite 600
                        <br />
                        San Francisco, CA 94107
                        <br />
                        <abbr title="Phone">P:</abbr> (123) 456-7890
                      </address>
                    </div>
                    <div className="col-xs-6 text-right">
                      <address>
                        <strong>Shipped To:</strong>
                        <br />
                        Elaine Hernandez
                        <br />
                        P. Sherman 42,
                        <br />
                        Wallaby Way, Sidney
                        <br />
                        <abbr title="Phone">P:</abbr> (123) 345-6789
                      </address>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-6">
                      <address>
                        <strong>Payment Method:</strong>
                        <br />
                        Visa ending **** 1234
                        <br />
                        h.elaine@gmail.com
                        <br />
                      </address>
                    </div>
                    <div className="col-xs-6 text-right">
                      <address>
                        <strong>Order Date:</strong>
                        <br />
                        17/06/14
                      </address>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <h3>ORDER SUMMARY</h3>
                      <table className="table table-striped">
                        <thead>
                          <tr className="line">
                            <td>
                              <strong>#</strong>
                            </td>
                            <td className="text-center">
                              <strong>Mô Tả</strong>
                            </td>
                            <td className="text-center">
                              <strong>Số Lượng</strong>
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
                              <strong>Template Design</strong>
                              <br />
                            </td>
                            <td className="text-center">15</td>
                            <td className="text-center">$75</td>
                            <td className="text-right">$1,125.00</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>
                              <strong>Template Development</strong>
                              <br />
                            </td>
                            <td className="text-center">15</td>
                            <td className="text-center">$75</td>
                            <td className="text-right">$1,125.00</td>
                          </tr>
                          <tr className="line">
                            <td>3</td>
                            <td>
                              <strong>Testing</strong>
                              <br />
                            </td>
                            <td className="text-center">2</td>
                            <td className="text-center">$75</td>
                            <td className="text-right">$150.00</td>
                          </tr>
                          <tr>
                            <td colSpan={3} />
                            <td className="text-right">
                              <strong>Taxes</strong>
                            </td>
                            <td className="text-right">
                              <strong>N/A</strong>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={3}></td>
                            <td className="text-right">
                              <strong>Total</strong>
                            </td>
                            <td className="text-right">
                              <strong>$2,400.00</strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 text-right identity"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* END INVOICE */}
          </div>
        </div>
      </div>
    </>
  );
}

export default AssetsmentList;
