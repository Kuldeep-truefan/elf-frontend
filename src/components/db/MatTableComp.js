import * as React from 'react';
import { useState } from 'react';
import MaterialTable from "@material-table/core";
import { BASE_URL } from "../../constants/constant";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useQuery } from 'react-query';
import { Icon } from '@mui/material';
// import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import Modal from '@mui/material/Modal';
import PopUp from './PopUp';
import DashboardLoder from '../ExtraComponents/DashboardLoder';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MatTableComp = React.forwardRef((props, ref) => {

  // Modal States 
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [fetching, setFetching] = useState(false)
  const [fileData, setFileData] = useState({
    blob:'',
    subBucket:''
  })
  const sheet_wish_dict = {'BIRTHDAY': 'bd', 'BEST_WISHES': 'bw', 'DIWALI': 'dw', 'CHRISTMAS': 'xmas', 'MAKAR_SANKRANTI': 'ms',
  'NEW_YEAR_WISH': 'ny', 'REPUBLIC_DAY': 'rd', 'REPUBLIC_DAY_V2': 'rd', 'VALENTINE_DAY': 'vd', 'LOHRI': 'ld', 'PROPOSAL':'pro'}
  const sheet_id_dict = {14: 'rs', 7: 'kk', 16: 'jk', 15: 'jf', 18: 'ap', 23: 'ak'}

  const [columns, setColumns] = useState([
    { title: 'Date', field: 'date', editable: 'never' },
    { title: 'Video ID', field: 'video_id', editable: 'never' },
    { title: 'VAS', field: 'vas', editable:'never'},
    { title: 'Request Name', field: 'request_name', editable:'never'},
    { title: 'Simplified Name', field: 'simplified_name', editable:'never'},
    { title: 'Hindi Name', field: 'hindi_name', editable:'never' },
    { title: 'Celeb', field: 'celeb', lookup: {"14": 'rs', "7": 'kk', "16": 'jk', "15": 'jf', "18": 'ap', "23": 'ak', "24": 'rm', "25": 'vb'}, editable:'never'},
    { title: 'Occasion', field: 'occasion', editable:'never'},
    { title: 'IPA', field: 'ipa', editable: "never" },
    { title: 'Namecode', field: 'namecode', editable:"never"},
    { title: 'QC Status', field: 'qc_status', lookup: {"Approved":"Approved", "NEW":"NEW", "Redo Lipsync":"Redo Lipsync", "Audio Mistreated":"Audio Mistreated", "Audio Mispronounced":"Audio Mispronounced",
    "AV Redo":"AV Redo", "AV Sync Mismatch":"AV Sync Mismatch", "Fix hi":"Fix hi", "Trim Reject":"Trim Reject", 
    "Add gap between A & B":"Add gap between A & B", "Reduce gap between A & B":"Reduce gap between A & B",
    "AV Redo (mistreated)":"AV Redo (mistreated)", "Confirm Pronunciation":"Confirm Pronunciation", "REFUNDED":"REFUNDED", "Final QC":"Final QC", "In Queue":"In Queue", "QC2":"QC2", "In Progress":"In Progress", "N2V QC2":"N2V QC2",
    "TEST":"TEST" }},
    { title: 'QC Comment', field: 'qc_comment', editable:'never' },
    // { title: 'Output Link', field: 'output_link', editable:'never' },
    {
      title: 'Download',
      sorting: false,
      render: rowData => (

        <DownloadIcon sx={{cursor:'pointer','&:hover':{color: '#ad6efb'}}} onClick={() => { 
          let blob =   `${rowData.simplified_name}_${sheet_id_dict[rowData.celeb]}_${sheet_wish_dict[rowData.occasion]}_${rowData.video_id}`
          let subbucket = sheet_id_dict[rowData.celeb]
          setFileData({
            blob: blob,
            subBucket:subbucket
          })
          handleOpen();
        }} variant="contained"></DownloadIcon>     
      ),
    },
  ]);

  // const createDataForModal = (rowData)=>{
  //   let blob =   `${rowData.simplified_name}_${rowData.celeb}_${rowData.occasion}_${rowData.video_id}`
  //   let subbucket = `${rowData.celeb}`
  //   setFileData({
  //     blob: blob,
  //     subBucket:subbucket
  //   })
  // }
    
  const [rowData, setRowData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  let FetchDetailsOnDashboard = async (e) => {
    setFetching(true)
        const data = await fetch(`${BASE_URL}/audio/data-for-dashboard`, {
        method: "GET",
        })
        .then((response) => response.json())

        return data;
  };

  const { isLoading,isFetching, refetch } = useQuery(['FetchDetailsOnDashboard'],() => FetchDetailsOnDashboard(),
  {
    onSuccess: (res) => {
      const {data} = res
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
          // output_link: data[i][12],
        })
      }
      setRowData(temp_arr);
      setFetching(false)
    }
  })

  let UpdateRowData = async (qc_status, video_id) => {
    try {
      let requestOptions = {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          "video_id": video_id,
          "qc_status": qc_status
        }),
      };
      const response = await fetch(
        `${BASE_URL}/audio/update-row-from-dashboard`,
        requestOptions
      )
      .then((response) => response.json());
      
    } catch (error) {
      console.log(error);
    }
  };
  React.useImperativeHandle(ref, () => ({
    refetch,
  }));

  let mat_tablle=null;

  if(rowData===null || isLoading || isFetching){
    mat_tablle = <DashboardLoder/>
  //   mat_tablle = <Box sx={{ display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center', }}>
  //   <DashboardLoder/>
  // </Box>
  }
  else{
    mat_tablle = <div>

    

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <PopUp data={fileData}/>
        </Box>
        </Modal>
      <MaterialTable
    title="Video Production Requests"
    data={rowData}
    columns={columns}
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
      onRowUpdateCancelled: (rowData) => console.log("Row editing cancelled"),
      onRowUpdate: (newData, oldData) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const dataUpdate = [...rowData];
            const target = dataUpdate.find(
              (el) => el.id === oldData.tableData.id
            );
            const index = dataUpdate.indexOf(target);
            dataUpdate[index] = newData;
            if(oldData["qc_status"]!==newData["qc_status"]){
              UpdateRowData(newData["qc_status"], newData["video_id"])
              .then(setRowData([...dataUpdate]));
            }
            resolve();
          }, 2000);
        });
      },
    }}
  /></div>;
  };
  
  return mat_tablle;
}
)

export default MatTableComp;
