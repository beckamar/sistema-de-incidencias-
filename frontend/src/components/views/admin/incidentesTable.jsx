import React, { useMemo} from 'react';
import { MaterialReactTable, useMaterialReactTable} from 'material-react-table';
import dayjs from 'dayjs';
import { Box, TextField  } from '@mui/material';
import { FaArrowLeft } from 'react-icons/fa';
import { useLocation,  useNavigate  } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useIncidentesData from '../../../hooks/incidente/useIncidentesData'; 
import useIncidentesTable from './useIncidentesTable';


const TablaIncidentes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedRol, selectedCentro, selectedSubcentro } = location.state;
  const { 
    listaIncidentes = [], 
    error, 
    updateStatus,
    isUpdatingStatus 
  } = useIncidentesData();
  const {filtradoDatos} = useIncidentesTable({listaIncidentes, selectedRol, selectedCentro, selectedSubcentro});

  const columns = useMemo(() => [
    
    {
      accessorKey: 'tipo_incidente',
      header: 'Tipo',
      enableEditing: false,
    },
    {
      accessorKey: 'estado_incidente',
      header: 'Status',
      editVariant: 'select',
      editSelectOptions: [
        { value: 'Pendiente', label: 'Pendiente' },
        { value: 'Resuelto', label: 'Resuelto' },
      ],
    },
    {
      accessorKey: 'subtipo',
      header: 'Subtipo',
      enableEditing: false,
    },
    {
      accessorKey: 'centro_trabajo',
      header: 'Centro de Trabajo',
      enableEditing: false,
    },
    {
      accessorKey: 'subcentro',
      header: 'Área/Agencia',
      Edit: ({ row}) => {
        if (!row.original.subcentro) return null;
        return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <span style={{ fontSize: '0.75rem', color: '#6669' }}>Área/Agencia</span>
          <TextField
            value={row.original.subcentro}
            disabled
            fullWidth
            variant="standard"
            InputProps={{ disableUnderline: true }}
          />
          </Box>
        );
      },
    },
    {
      accessorKey: 'fecha_reporte',
      header: 'Fecha Reporte',
      Cell: ({ cell }) => dayjs(cell.getValue()).format('DD/MM/YYYY'),
      enableEditing: false,
    },
    {
      accessorKey: 'hora_reporte',
      header: 'Hora Reporte',
      enableEditing: false,
    },
    {
      accessorKey: 'empleado_ausente',
      header: 'Empleado Ausente',
      Edit: ({ row}) => {
        if (!row.original.empleado_ausente) return null;
        return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <span style={{ fontSize: '0.75rem', color: '#6669' }}>Empleado Ausente</span>
          <TextField
            value={row.original.empleado_ausente}
            disabled
            fullWidth
            variant="standard"
            InputProps={{ disableUnderline: true }}
          />
          </Box>
        );
      },
    },
    {
      accessorKey: 'detalles',
      header: 'Detalles',
      enableEditing: false,
    },
  ], []);

  const handleSaveRow = async ({ table, row, values }) => {
    if (values.estado_incidente !== row.original.estado_incidente) {
      const estado = values.estado_incidente === 'Resuelto';
      const result = await updateStatus(row.original.id_incidente, estado);
    }
    table.setEditingRow(null); 
  };


  const table = useMaterialReactTable({
    columns,
    data: filtradoDatos,
    enableEditing: true,
    editDisplayMode: 'modal',     
    onEditingRowSave: handleSaveRow,
    localization: {
      edit: 'Incidencia', 
    },
    muiTopToolbarProps: {
      sx: {
        backgroundColor: '#009A49',
        color: 'white',
      },
    },
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 }, pl: 1, py: 0.5 }}>
        <IconButton
          onClick={() => navigate('/login')} 
          size="small"
          >
          <ArrowBackIcon fontSize="small" />
        </IconButton>
      </Box>
    ),
    muiToolbarAlertBannerProps: error
      ? {
          color: 'error',
          children: 'Error al cargar los datos',
        }
      : undefined,
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
