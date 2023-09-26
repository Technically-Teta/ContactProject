import React, { useMemo } from 'react'

const createContact = (props) => {

const [ contact, setContact ] = useState({name:"", email:"",phone:"",notes:""})

// need  here columns / forms 
// material react table   
// connect to db fetch and await

//Think of memoization as caching a value so that it does not need to be recalculated.
//The useMemo Hook only runs when one of its dependencies update.

// BUILD THE COLUMNS HERE
const buildColumns = useMemo => (
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


   












(


    }]




  return (
    <div>
      
    </div>
  )
}

export default createcontact





import { useRef } from "react";

const FormEvent = (props) => {

    //const [ contact, setContact ] = useState({title: "", location: "", eventtime: ""})
    const userTitle = useRef();
    const userLocation = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userEvent = {title: userTitle.current?.value, location: userLocation?.current.value, eventtime: new Date()}
        //console.log("Inside the component", userEvent);
        props.submit(userEvent);
       
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2> Please register your next Event in our community</h2>

            <label>Event Title</label>
            <input type="text" name="title" required placeholder="Title of your Event" ref={userTitle}/>

            <label>Event Location</label>
            <input type="text" name="location" required placeholder="Where will be your event" ref={userLocation}/>

            <button type="submit">Submit</button>
        </form>

    )
}
}
export default FormEvent;