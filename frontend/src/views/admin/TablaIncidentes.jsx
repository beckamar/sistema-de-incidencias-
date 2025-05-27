import { useMemo} from 'react';
import { MaterialReactTable, useMaterialReactTable} from 'material-react-table';
import dayjs from 'dayjs';
import useIncidentesData from '../../hooks/incidente/useIncidentesData';



const TablaIncidentes = ({listaIncidentes}) => {
  const {updateStatus, isUpdatingStatus} = useIncidentesData();



  const columns = useMemo(() => [
    
    {
      accessorKey: 'tipo_incidente',
      header: 'Tipo',
      enableEditing: false,
      enableSorting: false,
    },
    {
      accessorKey: 'subcentro',
      header: 'Zona/área',
      enableEditing: false,
      enableSorting: false,
    },
        {
      accessorKey: 'centro_trabajo',
      header: 'Centro',
      enableEditing: false,
      enableSorting: false,
    },

    {
      accessorKey: 'subtipo',
      header: 'Subtipo',
      enableEditing: false,
      enableSorting: false,
    },
    {
      accessorKey: 'afectado',
      header: 'Afectado',
      enableEditing: false,
      enableSorting: false,
    },
    {
      accessorKey: 'estado_incidente',
      header: 'Status',
      editVariant: 'select',
      editSelectOptions: [
        { value: 'Pendiente', label: 'Pendiente' },
        { value: 'Resuelto', label: 'Resuelto' },
      ],
      enableSorting: true,
    },
    {
      accessorKey: 'fecha_reporte',
      header: 'Fecha Reporte',
      Cell: ({ cell }) => dayjs(cell.getValue()).format('DD/MM/YYYY'),
      enableEditing: false,
      enableSorting: true,
    },
    {
      accessorKey: 'hora_reporte',
      header: 'Hora Reporte',
      enableEditing: false,
      enableSorting: false,
    },
    {
      accessorKey: 'detalles',
      header: 'Detalles',
      enableEditing: false,
      enableSorting: false,
    },
  ], []);

  const handleSaveRow = async ({ table, row, values }) => {
    if (values.estado_incidente !== row.original.estado_incidente) {
      const estado = values.estado_incidente === 'Resuelto';
      const result = await updateStatus(row.original.id_incidente, estado);
      row.original.estado_incidente = values.estado_incidente;
      table.setSorting([{ id: 'estado_incidente', desc: false }]);

    }
    table.setEditingRow(null); 
  };


  const table = useMaterialReactTable({
    columns,
    data: Array.isArray(listaIncidentes) ? listaIncidentes : [],    
    enableEditing: true,
    editDisplayMode: 'modal',     
    onEditingRowSave: handleSaveRow,
    localization: {
      edit: 'Incidencia', 
    },
    muiTopToolbarProps: {
      sx: {
        color: 'white',
      },
    },
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    muiTableBodyCellProps: ({ cell }) => ({
      sx: {
        backgroundColor: cell.row.original.estado_incidente === 'Pendiente' 
        ? '#ffcdd2' 
        : '#e8f5e9',
        },
    }),
    muiTablePaperProps: {
      sx: { 
        maxWidth: '100%',
        overflowX: 'auto',
        '@media (max-width: 600px)': { boxShadow: 'none' }
      }
    },
    enableStickyHeader: true,
    state: {
      isLoading: isUpdatingStatus,
    },



  
  });

  return <MaterialReactTable table={table} />;
};

export default TablaIncidentes;

