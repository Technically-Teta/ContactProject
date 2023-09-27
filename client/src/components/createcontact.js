import React, { useCallback, useMemo, useState } from 'react';
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
import { data, states } from './makeData';

const CreateContact = () => {

    //USE STATES
const [tableData, setTableData] = useState(() => data);
const [validationErrors, setValidationErrors] = useState({});

//FUNCTIONS FOR ACTIONS 
const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

const handleCancelRowEdits = () => {
    setValidationErrors({});
  };


  const handleDeleteRow = useCallback(
    (row) => {
      if (
        !confirm(`Are you sure you want to delete ${row.getValue('Name')}`)
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData],
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
              : cell.column.id === 'age'
              ? validateAge(+event.target.value)
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

   
// connect to db fetch and await

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
        accessorKey: 'state',
        header: 'State',
        muiTableBodyCellEditTextFieldProps: {
          select: true, //change to select for a dropdown
          children: states.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
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

      


    </div>
      
    
  );

   // eslint-disable-next-line no-unreachable
    const validateRequired = (value) => !!value.length;
    const validateEmail = (email) =>
    !!email.length &&
    email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );


}


export default CreateContact;