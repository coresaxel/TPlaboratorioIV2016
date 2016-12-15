miApp.controller("controllerExportar", function ($scope, $state, $stateParams, FileUploader, fsUser, $location, fRutas) {
    if (!fsUser.VerificarLogin())
        $state.go('Pizzeria.Principal');

    if ($location.$$host == "localhost") {
        var Url = fRutas.RutaDesarrollo;
    } else {
        var Url = fRutas.RutasWeb;
    }

    $scope.titulo = "Exportar Ventas";
    // Objeto de configuracion de la grilla.
    $scope.gridOptions = {
        // Configuracion para exportar datos.
        exporterCsvFilename: 'Ventas De la Pizzeria.csv',
        exporterCsvColumnSeparator: ';',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'green' },
        exporterPdfHeader: { text: "Ventas De la Pizzeria", style: 'headerStyle' },
        exporterPdfFooter: function (currentPage, pageCount) {
            return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        },
        exporterPdfCustomFormatter: function (docDefinition) {
            docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
            docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
            return docDefinition;
        },
        exporterPdfOrientation: 'landscape',
        exporterPdfPageSize: 'LETTER',
        exporterPdfMaxGridWidth: 500,
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        }
    };
    $scope.gridOptions.enableGridMenu = true;
    $scope.gridOptions.enableFiltering = true;
    $scope.gridOptions.selectAll = true;
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    // Configuracion de la paginacion
    $scope.gridOptions.paginationPageSize = 25;
    $scope.gridOptions.columnDefs = columnDefs();

    fsUser.TraerTodos('Pedido')
        .then(function (respuesta) {
            $scope.gridOptions.data = respuesta;
        }, function (error) {
            console.info(error);
        });
    function columnDefs() {
        return [
            { field: 'nombre_usuario', name: 'Nombre Usuario', enableFiltering: false },
            { field: 'descripcion_pizza', name: 'Pizza', enableFiltering: false },
            { field: 'nombre_local', name: 'Local', enableFiltering: true },
            { field: 'cantidad_pizza', name: 'Cantidad', enableFiltering: false },
            { field: 'fecha_entrega', name: 'Fecha', enableFiltering: false },
            { field: 'estado_pedido', cellTemplate: '<div ng-if="row.entity.estado_pedido == 0">Pendiente</div/><div ng-if="row.entity.estado_pedido == 1">Finalizado</div/>', name: 'Estado', enableFiltering: false },
        ];
    }

});