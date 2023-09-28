/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {
  Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
  IconButton,
  MenuItem,
//   Stack,
//   TextField,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import RelationshipContact, { relationships } from './relationshipcontact'; // Import the component and the 'relationships' array



const CreateContact = () => {

    //USE STATES

const [tableData, setTableData] = useState([]);
const [validationErrors, setValidationErrors] = useState({});


// GET, POST, PUT, DELETE

//GET 
const getContacts = () => {
  fetch("http://localhost:3000/")
  .then((response)=> response.json())
  .then(tableData => {
    setTableData(tableData);
    console.log('Contacts fetched...',tableData)
  });
}

//POST
const handlePostRequest = (data) => {
fetch("http://localhost:3000/api/contacts", { 
  method: 'POST',
  headers:{ 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
.then((reponse) => reponse.json())
    .then((data) => {
      console.log("Inside the post line 48", data)
      setTableData([... data])
    })

  };



useEffect(() => {getContacts()},[]);




//FUNCTIONS FOR ACTIONS 
const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
//PUT
    const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tableData),
      }
      fetch("http://localhost:3000/api/contacts/:id" + tableData.id, requestOptions) 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data updated successfully:', data);
        // You can update your component's state or take any other actions here
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  }

      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  

const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    (row) => {
      if (!confirm(`Are you sure you want to delete ${row.getValue('Name')}`)) {
        return;
      }
  
      // Send API delete request here, then refetch or update local table data for re-render
      const handleDeleteRequest = (id) => {
        fetch(`http://localhost:8080/api/events/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.status === 200) {
              getContacts();
            }
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
          });
      };
  
      // Call the delete request function with the appropriate ID
      handleDeleteRequest(row.original.id);
  
      // Update local table data to trigger a re-render
      const updatedTableData = [...tableData];
      updatedTableData.splice(row.index, 1);
      setTableData(updatedTableData);
    },
    [tableData]
  );
  

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === 'email'
              ? validateEmail(event.target.value)
              : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid 
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors],
  );

   
//Think of memoization as caching a value so that it does not need to be recalculated.The useMemo Hook only runs when one of its dependencies update
// BUILD THE COLUMNS HERE
const buildColumns = useMemo(
   () => [{
     accessorKey: 'id',
     header: 'ID',
     enableColumnOrdering: false,
     enableEditing: false,
     enableSorting : false,
     size: 90,
   },

   {
    accessorKey: 'name',
    header: 'Name',
    size: 140,
    muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        ...getCommonEditTextFieldProps(cell),
      }),
   },
   {
    accessorKey: 'email',
        header: 'Email',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'email',
        }),
   
    },
    {
    accessorKey: 'phone',
    header:'Phone',
    size: 80,
    muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      ...getCommonEditTextFieldProps(cell),
      type: 'number',
    }),
    },
    {  
           
    accessorKey: 'relationship',
        header: 'relationship',
        muiTableBodyCellEditTextFieldProps: {
          select: true, //change to select for a dropdown
          children: relationships.map((relationship) => (
            <MenuItem key={relationship} value={relationship}>
              {relationship}
            </MenuItem>
          )),
        },
      },
   ],

[getCommonEditTextFieldProps],
);

//CREATE FUNCTIONS FOR THE COLUMNS; EDIT AND DELETE  
   




  return (
    
    <div>
      <RelationshipContact/>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 120,
          },
        }}
       buildColumns={buildColumns}
       data ={tableData}
       editingMode="modal" //default
       enableColumnOrdering
       enableEditing
       onEditingRowSave={handleSaveRowEdits} 
       onCancelRowSave={handleCancelRowEdits}
       renderRowActions={({ row, table }) => (
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Tooltip arrow placement="left" title="Edit">
            <IconButton onClick={() => table.setEditingRow(row)}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="right" title="Delete">
            <IconButton color="error" onClick={() => handleDeleteRow(row)}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      )}
        />
         <div className='validation errors'>






         </div>





    </div>
      
    
  );

       };



const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );


export default CreateContact