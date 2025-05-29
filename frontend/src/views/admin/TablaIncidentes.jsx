import { useMemo} from 'react';
import { MaterialReactTable, useMaterialReactTable} from 'material-react-table';
import dayjs from 'dayjs';
import useIncidentesData from '../../hooks/incidente/useIncidentesData';



const TablaIncidentes = ({listaIncidentes, setlistaIncidentes, listaStatus}) => {
  const {updateStatus, isUpdatingStatus} = useIncidentesData();

  const ordenarIncidentes = (incidentes) => {
    const getStatusOrder = id_estado => {
      if (id_estado === 1) return 0;
      if (id_estado === 2) return 1;
      if (id_estado === 3) return 2;
      return 99;
    };
    return [...incidentes].sort((a, b) => {
      const grupoA = getStatusOrder(a.id_estado);
      const grupoB = getStatusOrder(b.id_estado);
      if (grupoA !== grupoB) return grupoA - grupoB;
      return a.id_incidente - b.id_incidente;
    });
  };

  const dataOrdenada = useMemo(
    () => ordenarIncidentes(Array.isArray(listaIncidentes) ? listaIncidentes : []),
    [listaIncidentes]
  );

  const handleSaveRow = async ({ table, row, values }) => {
    if (values.id_estado !== row.original.id_estado) {
      await updateStatus(row.original.id_incidente, values.id_estado);
      const nuevoEstado = listaStatus.find(e => e.id === values.id_estado)?.nombre || '';
      setlistaIncidentes(prev => 
        ordenarIncidentes(
          prev.map(inc =>
            inc.id_incidente === row.original.id_incidente
              ? { ...inc, id_estado: values.id_estado, estado_incidente: nuevoEstado }
              : inc
          )
        )
      );
    }
    table.setEditingRow(null); 
  };

   //------------Columnas de la tabla------------ 

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
      editSelectOptions: listaStatus.map(e => ({ value: e.id, label: e.nombre })),
      Cell: ({ cell, row }) => {
      const idEstado = row.original.id_estado;
      const estado = listaStatus.find(e => e.id === idEstado);
      return estado ? estado.nombre : '';
    },
      enableSorting: false,
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
  ],  [listaStatus]);


  const statusColorMap = {
    'Pendiente': ' #ffcdd2', 
    'En Proceso': 'rgb(217, 235, 248)',    
    'Resuelto': ' #e8f5e9',     
  };



  //--------------Despliegue de la tabla----------

  const table = useMaterialReactTable({
    columns,
    data: dataOrdenada, 
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
      const idEstado = cell.row.original.estado_incidente;
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


























//No me juzguen, ya me quiero largar. No me gusta programacion web