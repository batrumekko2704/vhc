import {useMemo, useState} from 'react';
import {
    MRT_EditActionButtons,
    MaterialReactTable,
    // createRow,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    QueryClient,
    QueryClientProvider,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from "dayjs";

const Table = () => {
    const [validationErrors, setValidationErrors] = useState({});

    const columns = useMemo(
        () => [
            {
                accessorKey: 'order_id',
                header: 'Order ID',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.order_id,
                    helperText: validationErrors?.order_id,
                    //remove any previous validation errors when order focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            order_id: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
                size: 80,
            },
            {
                accessorKey: 'staff_name',
                header: 'Staff Name',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.staff_name,
                    helperText: validationErrors?.staff_name,
                    //remove any previous validation errors when order focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            staff_name: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'total_money',
                header: 'Total money',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.total_money,
                    helperText: validationErrors?.total_money,
                    //remove any previous validation errors when order focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            total_money: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorFn: (row) => new Date(row.timestamp),
                id: 'timestamp',
                header: 'Timestamp',
                filterVariant: 'date',
                sortingFn: 'datetime',
                Cell: ({ cell }) => dayjs(cell.getValue()).format('hh:mm:ss DD/MM/YY'),
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.timestamp,
                    helperText: validationErrors?.timestamp,
                    //remove any previous validation errors when order focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            timestamp: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            // {
            //     accessorKey: 'state',
            //     header: 'State',
            //     editVariant: 'select',
            //     editSelectOptions: usStates,
            //     muiEditTextFieldProps: {
            //         select: true,
            //         error: !!validationErrors?.state,
            //         helperText: validationErrors?.state,
            //     },
            // },
        ],
        [validationErrors],
    );

    //call CREATE hook
    const {mutateAsync: createOrder, isPending: isCreatingOrder} =
        useCreateOrder();
    //call READ hook
    const {
        data: fetchedOrders = [],
        isError: isLoadingOrdersError,
        isFetching: isFetchingOrders,
        isLoading: isLoadingOrders,
    } = useGetOrders();
    //call UPDATE hook
    const {mutateAsync: updateOrder, isPending: isUpdatingOrder} =
        useUpdateOrder();
    //call DELETE hook
    const {mutateAsync: deleteOrder, isPending: isDeletingOrder} =
        useDeleteOrder();

    //CREATE action
    const handleCreateOrder = async ({values, table}) => {
        const newValidationErrors = validateOrder(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await createOrder(values);
        table.setCreatingRow(null); //exit creating mode
    };

    //UPDATE action
    const handleSaveOrder = async ({values, table}) => {
        const newValidationErrors = validateOrder(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await updateOrder(values);
        table.setEditingRow(null); //exit editing mode
    };

    //DELETE action
    const openDeleteConfirmModal = (row) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            deleteOrder(row.original.id);
        }
    };

    const table = useMaterialReactTable({
        columns,
        data: fetchedOrders,
        createDisplayMode: 'row', //default ('row', and 'custom' are also available)
        editDisplayMode: 'row', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        getRowId: (row) => row.id,
        muiToolbarAlertBannerProps: isLoadingOrdersError
            ? {
                color: 'error',
                children: 'Error loading data',
            }
            : undefined,
        muiTableContainerProps: {
            sx: {
                minHeight: '500px',
            },
        },
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateOrder,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveOrder,
        //optionally customize modal content
        renderCreateRowDialogContent: ({table, row, internalEditComponents}) => (
            <>
                <DialogTitle variant="h3">Create New Order</DialogTitle>
                <DialogContent
                    sx={{display: 'flex', flexDirection: 'column', gap: '1rem'}}
                >
                    {internalEditComponents} {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row}/>
                </DialogActions>
            </>
        ),
        //optionally customize modal content
        renderEditRowDialogContent: ({table, row, internalEditComponents}) => (
            <>
                <DialogTitle variant="h3">Edit Order</DialogTitle>
                <DialogContent
                    sx={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}
                >
                    {internalEditComponents} {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row}/>
                </DialogActions>
            </>
        ),
        renderRowActions: ({row, table}) => (
            <Box sx={{display: 'flex', gap: '1rem'}}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <EditIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        renderTopToolbarCustomActions: ({table}) => (
            <Button
                variant="contained"
                onClick={() => {
                    table.setCreatingRow(true); //simplest way to open the create row modal with no default values
                    //or you can pass in a row object to set default values with the `createRow` helper function
                    // table.setCreatingRow(
                    //   createRow(table, {
                    //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
                    //   }),
                    // );
                }}
            >
                Create New Order
            </Button>
        ),
        state: {
            isLoading: isLoadingOrders,
            isSaving: isCreatingOrder || isUpdatingOrder || isDeletingOrder,
            showAlertBanner: isLoadingOrdersError,
            showProgressBars: isFetchingOrders,
        },
    });

    return <MaterialReactTable table={table}/>;
};

//CREATE hook (post new order to api)
function useCreateOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (order) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newOrderInfo) => {
            queryClient.setQueryData(['orders'], (prevOrders) => {
                    return [
                        ...prevOrders,
                        {
                            ...newOrderInfo,
                            id: (Math.random() + 1).toString(36).substring(7),
                        },
                    ]
                }
            )
        },
        // onSettled: () => queryClient.invalidateQueries({queryKey: ['orders']}), //refetch orders after mutation, disabled for demo
    });
}

//READ hook (get orders from api)
function useGetOrders() {
    return useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            //send api request here
            const fetchedData = await (await fetch('/api/order', {
                method: 'POST'
            })).json(); //fake api call
            console.log(fetchedData);
            return Promise.resolve(fetchedData);
        },
        refetchOnWindowFocus: false,
    });
}

//UPDATE hook (put order in api)
function useUpdateOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (order) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newOrderInfo) => {
            queryClient.setQueryData(['orders'], (prevOrders) =>
                prevOrders?.map((prevOrder) =>
                    prevOrder.id === newOrderInfo.id ? newOrderInfo : prevOrder,
                ),
            );
        },
        // onSettled: () => queryClient.invalidateQueries({queryKey: ['orders']}), //refetch orders after mutation, disabled for demo
    });
}

//DELETE hook (delete order in api)
function useDeleteOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (orderId) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (orderId) => {
            queryClient.setQueryData(['orders'], (prevOrders) =>
                prevOrders?.filter((order) => order.id !== orderId),
            );
        },
        // onSettled: () => queryClient.invalidateQueries({queryKey: ['orders']}), //refetch orders after mutation, disabled for demo
    });
}

const queryClient = new QueryClient();

const FinanceTable = () => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
        <Table/>
    </QueryClientProvider>
);

export default FinanceTable;

const validateRequired = (value) => !!value.length;

function validateOrder(order) {
    return {
        staff_name: !validateRequired(order.staff_name)
            ? 'Staff Name is Required'
            : '',
    };
}
