import React, { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

import { Box, IconButton, Tooltip, TextField  } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


import incidentesData from '../services/api/incidentesData'; 

const TablaIncidentes = () => {
  const { 
    listaIncidentes = [], 
    error, 
    updateStatus,
    isUpdatingStatus 
  } = incidentesData();

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
      Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
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
    data: listaIncidentes,
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
