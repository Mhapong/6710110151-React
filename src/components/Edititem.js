import "./Edititem.css";
import React from "react";

export const Edititem = () => {
    return <div className="Edit-container">
        <div className="Edit">
            <form>
                <div>
                    <label htmlFor="page">page</label>
                    <input name="page" />
                </div>

            </form>
        </div>
    </div>
}