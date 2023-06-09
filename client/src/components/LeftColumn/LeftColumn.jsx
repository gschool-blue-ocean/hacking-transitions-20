import React from "react";
import LeftColumnDrop from "./LeftColumnDrops";
import "./LeftColumn.css"

function LeftColumn(){

    return(
        <div className="leftColumn">
            <div className="leftColumnHeader">Cohorts</div>
            <LeftColumnDrop />
        </div>
    )
}
export default LeftColumn;