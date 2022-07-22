import GenericTemplate from "../templates/GenericTemplate";
import MaterialTable from 'material-table';
import { Users } from "../api/user";
import { UserList } from "../organisms/UserList";
import React, { useState, useEffect } from 'react';
import UserListRow from "../organisms/UserRow";
import { Edit } from  '@material-ui/icons';
import { Delete } from '@material-ui/icons';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
// import Alert from '@material-ui/lab/Alert';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import axios from 'axios'
import Grid from '@material-ui/core/Grid'


const api = axios.create({
  baseURL: ``
})

// type basedata = {
//   id: number
//   name: string
//   company: string
//   tel: string
// }

// const [data, setData] = useState<basedata[]>([]); //table data

// const [iserror, setIserror] = useState(false)
// const [errorMessages, setErrorMessages] = useState([])

const User: UserList[] = [
    {
      id: "1",
      name: "はじめてのReact",
      company: "ダミー",
      tel: ""
    },
    {
      id: "2",
      name: "React Hooks入門",
      company: "ダミー",
      tel: ""
    },
    {
      id: "3",
      name: "実践Reactアプリケーション開発",
      company: "ダミー",
      tel: ""
    }
  ];

  var columns = [
          { title: '担当者ID', field: 'id' },
          { title: '担当者名', field: 'name' },
          { title: '担当先', field: 'company' },
          { title: '担当先TEL', field: 'tel' }
  ]

  const tableIcons = {
    Add: forwardRef<SVGSVGElement>((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef<SVGSVGElement>((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef<SVGSVGElement>((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef<SVGSVGElement>((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef<SVGSVGElement>((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef<SVGSVGElement>((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef<SVGSVGElement>((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef<SVGSVGElement>((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef<SVGSVGElement>((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef<SVGSVGElement>((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef<SVGSVGElement>((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef<SVGSVGElement>((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef<SVGSVGElement>((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef<SVGSVGElement>((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef<SVGSVGElement>((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef<SVGSVGElement>((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef<SVGSVGElement>((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  // const NameList = (props) => {
  //   const listItems = props.User.map((User, index) =>
  //       <li key={index}>{User}</li>
  //   );
  //   console.log(listItems)
  //   return (
  //       <ul>{listItems}</ul>
  //   );
  // };

  function validateEmail(email){
    const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    return re.test(String(email).toLowerCase());
  }

  // const handleRowUpdate = (newData, oldData, resolve) => {
  //   //validation
  //   let errorList: string[] = []
  //   if(newData.first_name === ""){
  //     errorList.push("Please enter first name")
  //   }
  //   if(newData.last_name === ""){
  //     errorList.push("Please enter last name")
  //   }
  //   if(newData.email === "" || validateEmail(newData.email) === false){
  //     errorList.push("Please enter a valid email")
  //   }

  //   if(errorList.length < 1){
  //     api.patch("/users/"+newData.id, newData)
  //     .then(res => {
  //       const dataUpdate = [...data];
  //       const index = oldData.tableData.id;
  //       // dataUpdate[index] = newData;
  //       // setData([...dataUpdate]);
  //       resolve()
  //       setIserror(false)
  //       setErrorMessages([])
  //     })
  //     .catch(error => {
  //       // setErrorMessages(['Update failed! Server error'])
  //       setIserror(true)
  //       resolve()

  //     })
  //   }else{
  //     // setErrorMessages(errorList)
  //     setIserror(true)
  //     resolve()

  //   }

  // }

  // const handleRowAdd = (newData, resolve) => {
  //   //validation
  //   let errorList: string[] = []
  //   if(newData.first_name === undefined){
  //     errorList.push("Please enter first name")
  //   }
  //   if(newData.last_name === undefined){
  //     errorList.push("Please enter last name")
  //   }
  //   if(newData.email === undefined || validateEmail(newData.email) === false){
  //     errorList.push("Please enter a valid email")
  //   }

  //   if(errorList.length < 1){ //no error
  //     api.post("/users", newData)
  //     .then(res => {
  //       let dataToAdd = [...data];
  //       // dataToAdd.push(newData);
  //       // setData(dataToAdd);
  //       resolve()
  //       setErrorMessages([])
  //       setIserror(false)
  //     })
  //     .catch(error => {
  //       // setErrorMessages(["Cannot add data. Server error!"])
  //       setIserror(true)
  //       resolve()
  //     })
  //   }else{
  //     // setErrorMessages(errorList)
  //     setIserror(true)
  //     resolve()
  //   }


  // }

  // const handleRowDelete = (oldData, resolve) => {

  //   api.delete("/users/"+oldData.id)
  //     .then(res => {
  //       const dataDelete = [...data];
  //       const index = oldData.tableData.id;
  //       dataDelete.splice(index, 1);
  //       // setData([...dataDelete]);
  //       resolve()
  //     })
  //     .catch(error => {
  //       // setErrorMessages(["Delete failed! Server error"])
  //       setIserror(true)
  //       resolve()
  //     })
  // }



  const ProductPage: React.FC = () => {
    const userRows = User.map((b) => {
        return (
          <UserListRow
            User={b}
            key={b.id}
            onDelete={(id) => {}}
          />
        );
      });


  return (
    <GenericTemplate title="担当者一覧">
        {console.log(userRows)}
      <div>
      <MaterialTable
        localization={{
        header: { actions: '' },
        }}
        columns={[
          { title: '担当者ID', field: 'id' },
          { title: '担当者名', field: 'name' },
          { title: '担当先', field: 'company' },
          { title: '担当先TEL', field: 'tel' },
        ]}
        data={[
          // { itemName: 'チョコレート', category: 'お菓子', weight: 100, price: 120 },
          // { itemName: 'ケーキ', category: 'お菓子', weight: 400, price: 480 },
          // { itemName: 'りんご', category: 'フルーツ', weight: 500, price: 360 },
          // { itemName: 'バナナ', category: 'フルーツ', weight: 200, price: 300 },
          // { itemName: 'みかん', category: 'フルーツ', weight: 250, price: 180 },
          // { itemName: 'あああああ', category: 'お菓子', weight: 100, price: 120 },
          // { itemName: 'いいいいい', category: 'お菓子', weight: 400, price: 480 },
          // { itemName: 'ううううう', category: 'フルーツ', weight: 500, price: 360 },
          // { itemName: 'えええええ', category: 'フルーツ', weight: 200, price: 300 },
          // { itemName: 'おおおおおお', category: 'フルーツ', weight: 250, price: 180 },
        { userRows }
        // { id: 'チョコレート', name: 'お菓子', company: '100', tel: '120' },
      ]}
        options={{
          showTitle: false,
      }}
      actions={[
        {
          icon: Edit,
          tooltip: 'edit User',
          onClick: (event, rowData) => alert("You edit ")
        },
        {
          icon: Delete,
          tooltip: 'Delete User',
          onClick: (event, rowData) => alert("You delete ")
        }
      ]}
      />
//     </div>
//     </GenericTemplate>
//   );
// };

// const waitTime = 600

// interface Prop {
//   title: string
//   columns: any[]
//   data: any[]
//   rowAddHandler: (newData: any) => void
//   rowUpdateHandler: (newData: any, oldData: any) => void
//   rowDeleteHandler: (oldData: any) => void
// }
// const editableTable = ({
//   title,
//   columns,
//   data,
//   rowAddHandler,
//   rowUpdateHandler,
//   rowDeleteHandler,
// }: Prop) => (
//   <MaterialTable
//     title={title}
//     icons={tableIcons}
//     options={{
//       search: false,
//       sorting: false,
//       paging: false,
//       rowStyle: {
//         whiteSpace: 'nowrap',
//       },
//       headerStyle: {
//         whiteSpace: 'nowrap',
//       },
//     }}
//     localization={{
//       header: {
//         actions: '',
//       },
//       body: { editRow: { deleteText: deleteMessage } },
//     }}
//     columns={columns}
//     data={data}
//     editable={{
//       onRowAdd: (newData) =>
//         new Promise((resolve) => {
//           setTimeout(() => {
//             resolve(0)
//             rowAddHandler(newData)
//           }, waitTime)
//         }),
//       onRowUpdate: (newData, oldData) =>
//         new Promise((resolve) => {
//           setTimeout(() => {
//             resolve(0)
//             if (oldData) {
//               rowUpdateHandler(newData, oldData)
//             }
//           }, waitTime)
//         }),
//       onRowDelete: (oldData) =>
//         new Promise((resolve) => {
//           setTimeout(() => {
//             resolve(0)
//             rowDeleteHandler(oldData)
//           }, waitTime)
//         }),
//     }}
//   />
// )

// const ProductPage: React.FC = () => <Users />;
// return (
//   <div className="App">

//     <Grid container spacing={1}>
//         <Grid item xs={3}></Grid>
//         <Grid item xs={6}>
//         <div>
//           {iserror &&
//             <Alert severity="error">
//                 {errorMessages.map((msg, i) => {
//                     return <div key={i}>{msg}</div>
//                 })}
//             </Alert>
//           }
//         </div>
//           <MaterialTable
//             title="User data from remote source"
//             columns={columns}
//             data={data}
//             icons={tableIcons}
//             editable={{
//               onRowUpdate: (newData, oldData) =>
//                 new Promise((resolve) => {
//                     handleRowUpdate(newData, oldData, resolve);

//                 }),
//               onRowAdd: (newData) =>
//                 new Promise((resolve) => {
//                   handleRowAdd(newData, resolve)
//                 }),
//               onRowDelete: (oldData) =>
//                 new Promise((resolve) => {
//                   handleRowDelete(oldData, resolve)
//                 }),
//             }}
//           />
//         </Grid>
//         <Grid item xs={3}></Grid>
//       </Grid>
//   </div>
// );
  )}
export default ProductPage;