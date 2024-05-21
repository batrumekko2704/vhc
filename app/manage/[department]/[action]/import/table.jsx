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
                accessorKey: 'product_id',
                header: 'Product ID',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.product_id,
                    helperText: validationErrors?.product_id,
                    //remove any previous validation errors when product focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            product_id: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
                size: 80,
            },
            {
                accessorKey: 'product_code',
                header: 'Product Code',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.product_code,
                    helperText: validationErrors?.product_code,
                    //remove any previous validation errors when product focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            product_code: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'origin',
                header: 'Origin',
                filterVariant: 'select',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.state,
                    helperText: validationErrors?.state,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            product_code: undefined,
                        }),
                },
            }, {
                accessorKey: 'surface',
                header: 'Surface',
                filterVariant: 'select',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.surface,
                    helperText: validationErrors?.surface,
                    //remove any previous validation errors when product focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            surface: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            }, {
                accessorKey: 'thickness',
                header: 'Thickness',
                filterVariant: 'select',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.thickness,
                    helperText: validationErrors?.thickness,
                    //remove any previous validation errors when product focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            thickness: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            }, {
                accessorKey: 'material',
                header: 'Material',
                filterVariant: 'select',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.material,
                    helperText: validationErrors?.material,
                    //remove any previous validation errors when product focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            material: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
        ],
        [validationErrors],
    );

    //call CREATE hook
    const {mutateAsync: createProduct, isPending: isCreatingProduct} =
        useCreateProduct();
    //call READ hook
    const {
        data: fetchedProducts = [],
        isError: isLoadingProductsError,
        isFetching: isFetchingProducts,
        isLoading: isLoadingProducts,
    } = useGetProducts();
    //call UPDATE hook
    const {mutateAsync: updateProduct, isPending: isUpdatingProduct} =
        useUpdateProduct();
    //call DELETE hook
    const {mutateAsync: deleteProduct, isPending: isDeletingProduct} =
        useDeleteProduct();

    //CREATE action
    const handleCreateProduct = async ({values, table}) => {
        const newValidationErrors = validateProduct(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await createProduct(values);
        table.setCreatingRow(null); //exit creating mode
    };

    //UPDATE action
    const handleSaveProduct = async ({values, table}) => {
        const newValidationErrors = validateProduct(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await updateProduct(values);
        table.setEditingRow(null); //exit editing mode
    };

    //DELETE action
    const openDeleteConfirmModal = (row) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(row.original.id);
        }
    };

    const table = useMaterialReactTable({
        columns,
        data: fetchedProducts,
        createDisplayMode: 'row', //default ('row', and 'custom' are also available)
        editDisplayMode: 'row', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        enableFacetedValues: true,
        getRowId: (row) => row.id,
        muiToolbarAlertBannerProps: isLoadingProductsError
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
        onCreatingRowSave: handleCreateProduct,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveProduct,
        //optionally customize modal content
        renderCreateRowDialogContent: ({table, row, internalEditComponents}) => (
            <>
                <DialogTitle variant="h3">Create New Product</DialogTitle>
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
                <DialogTitle variant="h3">Edit Product</DialogTitle>
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
                Create New Product
            </Button>
        ),
        state: {
            isLoading: isLoadingProducts,
            isSaving: isCreatingProduct || isUpdatingProduct || isDeletingProduct,
            showAlertBanner: isLoadingProductsError,
            showProgressBars: isFetchingProducts,
        },
    });

    return <MaterialReactTable table={table}/>;
};

//CREATE hook (post new product to api)
function useCreateProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (product) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newProductInfo) => {
            queryClient.setQueryData(['products'], (prevProducts) => {
                    return [
                        ...prevProducts,
                        {
                            ...newProductInfo,
                            id: (Math.random() + 1).toString(36).substring(7),
                        },
                    ]
                }
            )
        },
        // onSettled: () => queryClient.invalidateQueries({queryKey: ['products']}), //refetch products after mutation, disabled for demo
    });
}

//READ hook (get products from api)
function useGetProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            //send api request here
            const fetchedData = await (await fetch('/api/product', {
                method: 'POST'
            })).json(); //fake api call
            console.log(fetchedData);
            return Promise.resolve(fetchedData);
        },
        refetchOnWindowFocus: false,
    });
}

//UPDATE hook (put product in api)
function useUpdateProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (product) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newProductInfo) => {
            queryClient.setQueryData(['products'], (prevProducts) =>
                prevProducts?.map((prevProduct) =>
                    prevProduct.id === newProductInfo.id ? newProductInfo : prevProduct,
                ),
            );
        },
        // onSettled: () => queryClient.invalidateQueries({queryKey: ['products']}), //refetch products after mutation, disabled for demo
    });
}

//DELETE hook (delete product in api)
function useDeleteProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (productId) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (productId) => {
            queryClient.setQueryData(['products'], (prevProducts) =>
                prevProducts?.filter((product) => product.id !== productId),
            );
        },
        // onSettled: () => queryClient.invalidateQueries({queryKey: ['products']}), //refetch products after mutation, disabled for demo
    });
}

const queryClient = new QueryClient();

const ImportTable = () => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
        <Table/>
    </QueryClientProvider>
);

export default ImportTable;

const validateRequired = (value) => !!value.length;

function validateProduct(product) {
    return {
        staff_name: !validateRequired(product.staff_name)
            ? 'Staff Name is Required'
            : '',
    };
}
