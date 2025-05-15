import React, { useMemo,  useState  } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import dayjs from 'dayjs';
import { Box, TextField, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import useIncidentesData from '../../hooks/incidente/useIncidentesData';
import useIncidentesTable from './useIncidentesTable';

const TablaIncidentes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedRol, selectedCentro, selectedSubcentro } = location.state;
  const {
    listaIncidentes = [],
    error,
    updateStatus,
    isUpdatingStatus,
  } = useIncidentesData();

  //Filtrado de las incidencias en base a la sede(area/zona) del rol seleccionado
  const { filtradoDatos } = useIncidentesTable({
    listaIncidentes,
    selectedRol,
    selectedCentro,
    selectedSubcentro,
  });

  const [expanded, setExpanded] = useState({}); 

  const incidentesAgrupados = useMemo(() => {
    const pendientes = filtradoDatos.filter(i => i.estado_incidente === 'Pendiente');
    const grupos = {};

    pendientes.forEach(i => {
      const tipo = i.tipo_incidente;
      if (!grupos[tipo]) grupos[tipo] = [];
      grupos[tipo].push(i);
    });

    return grupos;
  }, [filtradoDatos]);

  const dataSinGrupo = useMemo(() => {
    return filtradoDatos.filter(i => i.estado_incidente !== 'Pendiente');
  }, [filtradoDatos]);

  const datosCombinados = useMemo(() => {
    const filasAgrupadas = Object.entries(incidentesAgrupados).map(([tipo, incidentes]) => ({
      tipo_incidente: tipo,
      estado_incidente: 'Pendiente',
      incidentes,
      esGrupo: true,
      id_grupo: tipo,
    }));

    return [...filasAgrupadas, ...dataSinGrupo];
  }, [incidentesAgrupados, dataSinGrupo]);

  //Columnas incidentes
  const columns = useMemo(() => [
    {
      accessorKey: 'tipo_incidente',
      enableEditing: false,
      header: 'Tipo',
      Cell: ({ row }) =>
        row.original.esGrupo
          ? ` ${row.original.tipo_incidente} (${row.original.incidentes.length})`
          : row.original.tipo_incidente,
    },
    {
      accessorKey: 'subcentro',
      header: 'Área/Agencia',
      enableEditing: false,
    },
    {
      accessorKey: 'centro_trabajo',
      header: 'Centro de Trabajo',
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
      accessorKey: 'fecha_reporte',
      header: 'Fecha Reporte',
      enableEditing: false,
      Cell: ({ cell }) => cell.getValue() ? dayjs(cell.getValue()).format('DD/MM/YYYY') : '',
    },
    {
      accessorKey: 'hora_reporte',
      header: 'Hora Reporte',
      enableEditing: false,

    },
    {
      accessorKey: 'afectado' ,
      header: 'Afectado',
      enableEditing: false,

    },
    {
      accessorKey: 'detalles',
      header: 'Detalles',
      enableEditing: false,

    },
  ], []);

  const handleSaveRow = async ({ table, row, values }) => {
    if (values.estado_incidente !== row.original.estado_incidente && !row.original.esGrupo) {
      const estado = values.estado_incidente === 'Resuelto';
      await updateStatus(row.original.id_incidente, estado);
    }
    table.setEditingRow(null);
  };

  const table = useMaterialReactTable({
    columns,
    data: datosCombinados,
    enableEditing: true,
    editDisplayMode: 'modal',
    onEditingRowSave: handleSaveRow,
    getRowCanExpand: row => row.original.esGrupo === true,
    enableRowExpansion: true,
    enableExpandOnRowClick: true, 
    enableExpandAll: false,
    initialState: {
      columnVisibility: {
        'mrt-row-expand': false, 
      },
    },

    state: {
      expanded, 
      isLoading: isUpdatingStatus,
    },
    onExpandedChange: setExpanded,

    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        if (row.original.esGrupo) {
          setExpanded(prev => ({
            ...prev,
            [row.id]: !prev[row.id], 
          }));
        }
      },
      sx: {
        cursor: row.original.esGrupo ? 'pointer' : 'default',
      },
    }),



    renderDetailPanel: ({ row, table }) => {
      if (!row.original.esGrupo) return null;
      return (
        <Box sx={{ p: 0, m: 0 }}>
          <MaterialReactTable
            columns={columns}
            data={row.original.incidentes}
            enableEditing
            editDisplayMode="modal"
            onEditingRowSave={handleSaveRow}
            enableFilters={false}
            enableColumnFilterModes={false}
            enableGlobalFilter={false}
            enableColumnOrdering={false}
            enableSorting={false}
            enableTopToolbar={false}

            state={{ isLoading: isUpdatingStatus }}
            displayColumnDefOptions={{
              'mrt-row-actions': { size: 0 }, 
            }}
            enableColumnHead={false} 
            muiTableHeadCellProps={{
              sx: {
                display: 'none',
              },
            }}
            muiTablePaperProps={{
              sx: {
                boxShadow: 'none',
                margin: 0,
                padding: 0,
              },
            }}
            muiTableContainerProps={{
              sx: {
                padding: 0,
                margin: 0,
              },
            }}
          />
        </Box>
      );
    },
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
        <IconButton onClick={() => navigate('/login')} size="small">
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
      sx: { minHeight: '500px' },
    },
    muiTableBodyCellProps: ({ cell }) => ({
      sx: {
        backgroundColor:
          cell.row.original.estado_incidente === 'Pendiente'
            ? '#ffcdd2'
            : '#e8f5e9',
      },
    }),
    muiTablePaperProps: {
      sx: {
        maxWidth: '100%',
        overflowX: 'auto',
        '@media (max-width: 600px)': { boxShadow: 'none' },
      },
    },
    enableStickyHeader: true,
  });

  return <MaterialReactTable table={table} />;
};

export default TablaIncidentes;
