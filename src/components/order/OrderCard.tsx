import * as React from "react";

// Components
import OrderDeleteModal from "./OrderDeleteModal";
import OrderSaveModal from "./OrderSaveModal";

// Hooks
import { useModal } from "../../hooks/useModal";
import { useState } from "react";

// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Paper, TablePagination } from "@mui/material";

// Model
import { iOrder } from "../../interfaces/models/iOrder";

interface Props {
  orders: iOrder[];
}

const OrderCard: React.FC<Props> = ({ orders }) => {
  const { open, handleOpen, handleClose } = useModal();
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [selectedOrderId, setSelectedOrderId] = useState<number | undefined>(undefined); // Estado para almacenar el ID seleccionado

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!orders || orders.length === 0) {
    return <p>No orders available.</p>;
  }

  const paginatedOrders = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Funciones para manejar la apertura de los modales con el ID correcto
  const handleEditOpen = (orderId: number | undefined) => {
    setSelectedOrderId(orderId);
    handleOpen();
  };

  const handleDeleteOpen = (orderId: number | undefined) => {
    setSelectedOrderId(orderId);
    setOpenDelete(true);
  };

  return (
    <Box sx={{ maxWidth: 1500, margin: "auto" }}>
      <TableContainer component={Paper}>
        <Table aria-label="order table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">Customer Name</TableCell>
              <TableCell align="left">Total Amount</TableCell>
              <TableCell align="left">Date Order</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell component="th" scope="row">{order.id}</TableCell>
                <TableCell component="th" scope="row">{order.customerName}</TableCell>
                <TableCell align="left">{`$${order.totalAmount} USD`}</TableCell>
                <TableCell align="left">{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                <TableCell align="center">
                  <Box>
                    <IconButton onClick={() => handleEditOpen(order.id)} aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteOpen(order.id)} aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, backgroundColor: "white" }}
      />

      {/* Modals */}
      {selectedOrderId !== null && (
        <>
          <OrderSaveModal open={open} onClose={handleClose} mode="update" orderId={selectedOrderId} />
          <OrderDeleteModal open={openDelete} onClose={() => setOpenDelete(false)} orderId={selectedOrderId} />
        </>
      )}
    </Box>
  );
};

export default OrderCard;
