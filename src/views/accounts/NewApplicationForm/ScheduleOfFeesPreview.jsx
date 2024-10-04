import React from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie
export default function ScheduleOfFeesPreview() {
    const navigate = useNavigate();
    React.useEffect(() => {
        const is_ps_logged_in = Cookies.get('is_ps_logged_in') || 'false'
        const is_ps_remember_me = Cookies.get('is_ps_remember_me') || 'false'
        if (is_ps_logged_in === 'false') {
            // history.push("/my_business");
            navigate('/login')
        }
    }, []);
    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card d-flex flex-fill p-4">
                        <div className="preview-header">
                            <h2><span className="preview_point">3</span> Sehedule of Fess</h2>
                        </div>
                        <div className="card-body">
                            <h6 className="my-4">Debit</h6>
                            <hr className="mb-4" />
                            <div className="row">
                                <div className="col-md-12">
                                    <div>
                                        <strong>Visa debit / Vpay</strong>
                                        <div className="row mt-4">
                                            <div className="col-md-4">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Secure
                                                        rate:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" className="form-control my-3" disabled
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Non Secure
                                                        rate:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Per
                                                        Transaction
                                                        value:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-12">
                                    <div>
                                        <strong>Mastercard debit / Maestro Domestic </strong>

                                        <div className="row mt-4">
                                            <div className="col-md-4">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Secure
                                                        rate:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Non Secure
                                                        rate:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" className="form-control my-3" disabled
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Per
                                                        Transaction
                                                        value:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" className="form-control my-3" disabled
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div>
                                        <strong>Visa Business debit / International maestro</strong>
                                        <div className="row mt-4">
                                            <div className="col-md-4">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Secure
                                                        rate:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" className="form-control my-3" disabled
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Non Secure
                                                        rate:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" className="form-control my-3" disabled
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Per
                                                        Transaction
                                                        value:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" className="form-control my-3" disabled
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h6 className="my-4">Credit</h6>
                            <hr className="mb-4" />
                            <div className="row">
                                <div className="col-md-12">
                                    <div>
                                        <strong>Visa / Mastercard debit</strong>
                                        <div className="row mt-4">
                                            <div className="col-md-4">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Secure
                                                        rate:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" className="form-control my-3" disabled
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Non Secure
                                                        rate:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" className="form-control my-3" disabled
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Per
                                                        Transaction
                                                        value:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" className="form-control my-3" disabled
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div>
                                        <strong>Visa Business credit / Mastercard Business</strong>
                                        <div className="row mt-4">
                                            <div className="col-md-4">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Secure
                                                        rate:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" className="form-control my-3" disabled
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Non Secure
                                                        rate:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" className="form-control my-3" disabled
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label">Per
                                                        Transaction
                                                        value:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h6 className="my-4">Other Card</h6>
                            <hr className="mb-4" />
                            <div className="row">
                                <div className="col-md-6">
                                    <div>
                                        <strong>Visa Purchasing</strong>
                                        <div className="row mt-4">
                                            <div className="col-md-6">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Secure
                                                        rate:</label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-6 col-form-label">Non Secure
                                                        rate:</label>
                                                    <div className="col-sm-6">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div>
                                        <strong>Visa Corporate</strong>
                                        <div className="row mt-4">
                                            <div className="col-md-6">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Secure
                                                        rate:</label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-6 col-form-label">Non Secure
                                                        rate:</label>
                                                    <div className="col-sm-6">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row my-3">
                                <div className="col-md-6">
                                    <div>
                                        <strong>Mastercard Purchasing</strong>
                                        <div className="row mt-4">
                                            <div className="col-md-6">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Secure
                                                        rate:</label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-6 col-form-label">Non Secure
                                                        rate:</label>
                                                    <div className="col-sm-6">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div>
                                        <strong>Mastercard Fleet</strong>
                                        <div className="row mt-4">
                                            <div className="col-md-6">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Secure
                                                        rate:</label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-6 col-form-label">Non Secure
                                                        rate:</label>
                                                    <div className="col-sm-6">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row my-3">
                                <div className="col-md-6">
                                    <div>
                                        <strong>Mastercard Corporate</strong>
                                        <div className="row mt-4">
                                            <div className="col-md-6">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Secure
                                                        rate:</label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-6 col-form-label">Non Secure
                                                        rate:</label>
                                                    <div className="col-sm-6">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div>
                                        <strong>Mastercard Prepaid Commercial</strong>
                                        <div className="row mt-4">
                                            <div className="col-md-6">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Secure
                                                        rate:</label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-6 col-form-label">Non Secure
                                                        rate:</label>
                                                    <div className="col-sm-6">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row my-3">
                                <div className="col-md-6">
                                    <div>
                                        <strong>All Non-EEA Visa</strong>
                                        <div className="row mt-4">
                                            <div className="col-md-6">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Secure
                                                        rate:</label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-6 col-form-label">Non Secure
                                                        rate:</label>
                                                    <div className="col-sm-6">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div>
                                        <strong>All Non-EEA Mastercard</strong>
                                        <div className="row mt-4">
                                            <div className="col-md-6">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Secure
                                                        rate:</label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-6 col-form-label">Non Secure
                                                        rate:</label>
                                                    <div className="col-sm-6">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row my-3">
                                <div className="col-md-4">
                                    <div>
                                        <strong>Diners</strong>
                                        <div className="row mt-4">
                                            <div className="col-md-12">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Secure
                                                        rate:</label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div>
                                        <strong>JCB</strong>
                                        <div className="row mt-4">
                                            <div className="col-md-12">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Secure
                                                        rate:</label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div>
                                        <strong>Union Pay</strong>
                                        <div className="row mt-4">
                                            <div className="col-md-12">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Secure
                                                        rate:</label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <hr className="my-4" />
                            <h6 className="my-4">Table</h6>
                            <div className="row my-3">
                                <div className="col-md-3">
                                    <div>
                                        <strong>Auth Fees</strong>
                                        <input type="text" className="form-control my-3" disabled />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div>
                                        <strong>MMSC</strong>
                                        <input type="text" className="form-control my-3" disabled />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div>
                                        <strong>Average Transaction Value</strong>
                                        <input type="text" className="form-control my-3" disabled />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div>
                                        <strong>Annual Turnover</strong>
                                        <input type="text" className="form-control my-3" disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="row my-4">
                                <div className="col-md-3">
                                    <div>
                                        <strong>Annual Card Turnover</strong>
                                        <input type="text" className="form-control my-3" disabled />
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div>
                                        <strong>Card Acceptance Ratio</strong>
                                        <div className="row mt-4">
                                            <div className="col-md-4">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Face to
                                                        Face</label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail" className="col-sm-5 col-form-label">CNP/
                                                        Moto</label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3 row">
                                                    <label htmlFor="staticEmail"
                                                        className="col-sm-5 col-form-label">E-Commerce</label>
                                                    <div className="col-sm-7">
                                                        <input type="text" className="form-control my-3" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-md-6">
                                    <div>
                                        <strong>Notes</strong>
                                        <textarea className="form-control my-3" disabled id="exampleFormControlTextarea1"
                                            rows="5"></textarea>
                                    </div>
                                </div>
                                <div className="col-md-6"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
