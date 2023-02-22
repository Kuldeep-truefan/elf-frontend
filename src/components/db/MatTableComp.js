import * as React from 'react';
import { useState } from 'react';
import MaterialTable from "@material-table/core";
import { BASE_URL } from "../../constants/constant";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const MatTableComp = () => {
  const [columns, setColumns] = useState([
    { title: 'Date', field: 'date' },
    { title: 'Video ID', field: 'video_id', editable: 'never' },
    { title: 'VAS', field: 'vas', lookup: {"FULL_NAME":"FULL_NAME"}},
    { title: 'Request Name', field: 'request_name'},
    { title: 'Simplified Name', field: 'simplified_name'},
    { title: 'Hindi Name', field: 'hindi_name' },
    { title: 'Celeb', field: 'celeb', lookup: {"14": 'rs', "7": 'kk', "16": 'jk', "15": 'jf', "18": 'ap', "23": 'ak'}},
    { title: 'Occasion', field: 'occasion', lookup: {"BIRTHDAY": 'BIRTHDAY', "BEST_WISHES":"BEST_WISHES","DIWALI":"DIWALI", 
    "CHRISTMAS":"CHRISTMAS", "MAKAR_SANKRANTI":"MAKAR_SANKRANTI", "NEW_YEAR_WISH":"NEW_YEAR_WISH", "REPUBLIC_DAY_V2":"REPUBLIC_DAY_V2",
    "VALENTINE_DAY":"VALENTINE_DAY", "LOHRI":"LOHRI", "PROPOSAL":"PROPOSAL"}},
    { title: 'IPA', field: 'ipa', editable: "never" },
    { title: 'Namecode', field: 'namecode', editable:"never"},
    { title: 'QC Status', field: 'qc_status', lookup: {"Approved":"Approved", "NEW":"NEW", "Redo Lipsync":"Redo Lipsync", "Audio Mistreated":"Audio Mistreated", "Audio Mispronounced":"Audio Mispronounced",
    "AV Redo":"AV Redo", "AV Sync Mismatch":"AV Sync Mismatch", "Fix hi":"Fix hi", "Trim Reject":"Trim Reject", 
    "Add gap between A & B":"Add gap between A & B", "Reduce gap between A & B":"Reduce gap between A & B",
    "AV Redo (mistreated)":"AV Redo (mistreated)", "Confirm pronunciation":"Confirm pronunciation", "REFUNDED":"REFUNDED"}},
    { title: 'QC Comment', field: 'qc_comment' },
    { title: 'Output Link', field: 'output_link' },
    // {
    //   title: 'Birth Place',
    //   field: 'birthCity',
    //   lookup: { 34: 'İstanbul', 63: 'Şanlurfa' },
    // },
  ]);
    
  const [rowData, setRowData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  let data;
  function setRowsData(data){
    let temp_arr = [];
    for(let i=0;i<data.length;i++){
      temp_arr.push({
        id: i,
        date: data[i][0],
        video_id: data[i][1],
        vas: data[i][2],
        request_name: data[i][3],
        simplified_name: data[i][4],
        hindi_name: data[i][5],
        celeb: data[i][6],
        occasion: data[i][7],
        ipa: data[i][8],
        namecode: data[i][9],
        qc_status: data[i][10],
        qc_comment: data[i][11],
        output_link: data[i][12],
      })
    }
    setRowData(temp_arr);
    // console.log("aksjnfsj", temp_arr);
  }

  let FetchDetailsOnDashboard = async (e) => {
    try {
        fetch(`${BASE_URL}/audio/data-for-dashboard`, {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        })
        .then((response) => response.json())
        .then((data) => setRowsData(data["data"]));
    } catch (error) {
        // setLoading(false);
        setRowData([]);
        console.log("Error occured", error);
    }
  };
  if(rowData===null){
    FetchDetailsOnDashboard(); 
  }

  let UpdateRowData = async (date, video_id, vas, request_name, simplified_name, hindi_name, celeb, occasion, output_link) => {
    try {
      let requestOptions = {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          date: date,
          video_id: video_id, 
          vas: vas,
          request_name: request_name,
          simplified_name: simplified_name,
          hindi_name: hindi_name,
          celeb: celeb,
          occasion: occasion,
          output_link: output_link,
        }),
      };
      const response = await fetch(
        `${BASE_URL}/audio/update-row-from-dashboard`,
        requestOptions
      )
      .then((response) => response.json());
      
    } catch (error) {
      // alert("Upload Failed! Please try again!");
      // setUpl_status(false);
      // document.location.reload(false);
      console.log(error);
    }
  };


  // Helper function
  function getNewDataBulkEdit(changes, copyData) {
    // key matches the column data id
    const keys = Object.keys(changes);
    for (let i = 0; i < keys.length; i++) {
      if (changes[keys[i]] && changes[keys[i]].newData) {
        // Find the data item with the same key in copyData[]
        let targetData = copyData.find((el) => el.id === keys[i]);
        if (targetData) {
          let newTargetDataIndex = copyData.indexOf(targetData);
          copyData[newTargetDataIndex] = changes[keys[i]].newData;
        }
      }
    }
    return copyData;
  }

  let mat_tablle=null;

  if(rowData===null){
    mat_tablle = <Box sx={{ display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', }}>
    <CircularProgress />
  </Box>
  }else{
    mat_tablle = <div>
      <MaterialTable
    title="Video Production Requests"
    data={rowData}
    columns={columns}
    onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
    options={{
      tableLayout: "fixed",
      rowStyle: rowData => ({
        backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
      }),
      pageSize: 50,
      pageSizeOptions: [50],
      headerStyle: {
        backgroundColor: '#cab6e2',
        color: '#FFF'
      }
    }}
    editable={{
      // onBulkUpdate: (changes) => {
      //   return new Promise((resolve, reject) => {
      //     setTimeout(() => {
      //       let copyData = [...rowData];
      //       setRowData(getNewDataBulkEdit(changes, copyData));
      //       resolve();
      //     }, 1000);
      //   });
      // },
      // onRowAddCancelled: (rowData) => console.log("Row adding cancelled"),
      onRowUpdateCancelled: (rowData) => console.log("Row editing cancelled"),
      // onRowAdd: (newData) => {
      //   return new Promise((resolve, reject) => {
      //     setTimeout(() => {
      //       newData.id = "uuid-" + Math.random() * 10000000;
      //       setRowData([...rowData, newData]);
      //       resolve();
      //     }, 1000);
      //   });
      // },
      onRowUpdate: (newData, oldData) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const dataUpdate = [...rowData];
            // In dataUpdate, find target
            const target = dataUpdate.find(
              (el) => el.id === oldData.tableData.id
            );
            const index = dataUpdate.indexOf(target);
            // {"14": 'rs', "7": 'kk', "16": 'jk', "15": 'jf', "18": 'ap', "23": 'ak'}
            const celeb_occ_match_dict = {
              "7":["BIRTHDAY", "BEST_WISHES"],
              "16": ["BIRTHDAY", "BEST_WISHES", "DIWALI", "VALENTINE_DAY", "PROPOSAL"],
              "15": ["BIRTHDAY", "BEST_WISHES", "CHRISTMAS"], 
              "18": ["BIRTHDAY", "BEST_WISHES"],
              "23": ["BIRTHDAY", "BEST_WISHES", "MAKAR_SANKRANTI", "NEW_YEAR_WISH", "REPUBLIC_DAY_V2", "LOHRI"]
            };
            dataUpdate[index] = newData;
            
            let flag = 0;
            for(let i=0;i<celeb_occ_match_dict[""+dataUpdate[index]["celeb"]].length;i++){
              if(dataUpdate[index]["occasion"]===celeb_occ_match_dict[""+dataUpdate[index]["celeb"]][i]){
                flag = 1;
                break;
              }
            }
            if(flag === 1){
              if(oldData["vas"]!==newData["vas"] || oldData["request_name"]!==newData["request_name"] || oldData["celeb"]!==newData["celeb"] ||
                oldData["simplified_name"]!==newData["simplified_name"] || oldData["hindi_name"]!==newData["hindi_name"] ||
                oldData["celeb"]!==newData["celeb"] || oldData["occasion"]!==newData["occasion"]){
                dataUpdate[index]["output_link"] = null;
                dataUpdate[index]["qc_status"] = "NEW";
              }
              UpdateRowData(dataUpdate[index]["date"], dataUpdate[index]["video_id"], dataUpdate[index]["vas"], dataUpdate[index]["request_name"], 
                dataUpdate[index]["simplified_name"], dataUpdate[index]["hindi_name"], dataUpdate[index]["celeb"], dataUpdate[index]["occasion"], dataUpdate[index]["output_link"])
              .then(setRowData([...dataUpdate]));
            }
            else{
              alert("The Occasion is not available for that celebrity!");
            }

            // console.log("iajfakjnfa", celeb_occ_match_dict[""+dataUpdate[index]["celeb"]]);
            
            // if(oldData["vas"]!==newData["vas"] || oldData["request_name"]!==newData["request_name"] || oldData["celeb"]!==newData["celeb"] ||
            //   oldData["simplified_name"]!==newData["simplified_name"] || oldData["hindi_name"]!==newData["hindi_name"] ||
            //   oldData["celeb"]!==newData["celeb"] || oldData["occasion"]!==newData["occasion"]){
            //   dataUpdate[index]["output_link"] = null;
            //   dataUpdate[index]["qc_status"] = "NEW";
            // }
            // UpdateRowData(dataUpdate[index]["date"], dataUpdate[index]["video_id"], dataUpdate[index]["vas"], dataUpdate[index]["request_name"], 
            //   dataUpdate[index]["simplified_name"], dataUpdate[index]["hindi_name"], dataUpdate[index]["celeb"], dataUpdate[index]["occasion"], dataUpdate[index]["output_link"])
            // .then(setRowData([...dataUpdate]));
            resolve();
          }, 3000);
        });
      },
      // onRowDelete: (oldData) => {
      //   return new Promise((resolve, reject) => {
      //     setTimeout(() => {
      //       const dataDelete = [...rowData];
      //       const target = dataDelete.find(
      //         (el) => el.id === oldData.tableData.id
      //       );
      //       const index = dataDelete.indexOf(target);
      //       dataDelete.splice(index, 1);
      //       setRowData([...dataDelete]);
      //       resolve();
      //     }, 1000);
      //   });
      // },
    }}
  /></div>;
  };
  
  
  return mat_tablle;
}

export default MatTableComp;