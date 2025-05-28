import { useMemo} from 'react';
import { MaterialReactTable, useMaterialReactTable} from 'material-react-table';
import dayjs from 'dayjs';
import useIncidentesData from '../../hooks/incidente/useIncidentesData';



const TablaIncidentes = ({listaIncidentes}) => {
  const {listaStatus, updateStatus, isUpdatingStatus} = useIncidentesData();


  const statusOptions = useMemo(
    () =>
      Array.isArray(listaStatus)
        ? listaStatus.map((item) => ({
            value: Number(item.id),
            label: item.nombre,
          }))
        : [],
    [listaStatus]
    );

  console.log("listaStatus:", listaStatus);
    console.log("STATUSOPTIONS:", statusOptions);


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
      accessorKey: 'id_estado',
      header: 'Status',
      editVariant: 'select',
      editSelectOptions: statusOptions,
      enableEditing: true,
      enableSorting: false,
      Cell: ({ cell }) => {
        const option = statusOptions.find(opt => opt.value === cell.getValue());
        return option ? option.label : cell.getValue();
      }
    },
    {
      accessorKey: 'fecha_reporte',
      header: 'Fecha Reporte',
      Cell: ({ cell }) => dayjs(cell.getValue()).format('DD/MM/YYYY'),
      enableEditing: false,
      enableSorting: false,
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
    if (values.id_estado !== row.original.id_estado) {
      await updateStatus(row.original.id_incidente, values.id_estado);
      row.original.id_estado = values.id_estado;
      table.setSorting([{ id: 'id_estado', desc: false }]);

    }
    table.setEditingRow(null); 
  };

  const statusColorMap = {
    1: '#ffcdd2', // Pendiente (rojo)
    2: 'white',   // En Proceso (blanco)
    3: '#e8f5e9', // Resuelto (verde)
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
    muiTableBodyCellProps: ({ cell }) => {
      const idEstado = cell.row.original.id_estado;
      return {
        sx: {
          backgroundColor: statusColorMap[idEstado] || '',
        },
      };
    },
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

