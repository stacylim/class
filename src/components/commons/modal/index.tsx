import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '../../src/components/commons/modal';

export default function AlertDialogSlide() {
    const [open, setOpen] =React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);

    };

return(
    <div>
        (open && {
            <Modal 
            handleClose={handleClose}
            //open={open}
            />
        })
        <Button 
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        >

            Slide in alert dialog

        </Button>
        </div>
);



}
