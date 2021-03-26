__customIndicators = [
    {
        name: "Prediction",
        metainfo: {
            "_metainfoVersion": 40,
            "id": "Prediction@tv-basicstudies-1",
            "scriptIdPart": "",
            "name": "Prediction",
            "description": "Prediction",
            "shortDescription": "Prediction",

            "is_hidden_study": false,
            "is_price_study": true,
            "isCustomIndicator": true,

            "plots": [{"id": "plot_0", "type": "line"}, {"id": "plot_1", "type": "line"}, {"id": "plot_2", "type": "line"}],
            "defaults": {
                "styles": {
                    "plot_0": {
                        "linestyle": 0,
                        "visible": true,

                        // Make the line thinner
                        "linewidth": 1,

                        // Plot type is Line
                        "plottype": 2,

                        // Show price line
                        "trackPrice": true,

                        "transparency": 40,

                        // Set the plotted line color to dark red
                        "color": "#00FF00"
                    },
                    "plot_1": {
                        "linestyle": 0,
                        "visible": true,

                        // Make the line thinner
                        "linewidth": 1,

                        // Plot type is Line
                        "plottype": 2,

                        // Show price line
                        "trackPrice": true,

                        "transparency": 40,

                        // Set the plotted line color to dark red
                        "color": "#FF0000"
                    },
                    "plot_2": {
                        "linestyle": 0,
                        "visible": true,

                        // Make the line thinner
                        "linewidth": 1,

                        // Plot type is Line
                        "plottype": 2,

                        // Show price line
                        "trackPrice": true,

                        "transparency": 40,

                        // Set the plotted line color to dark red
                        "color": "#000000"
                    }
                },
                

                // Precision is set to one digit, e.g. 777.7
                "precision": 2,

                "inputs": {}
            },
            "styles": {
                "plot_0": {
                    // Output name will be displayed in the Style window
                    "title": "Prediction Upper Bound",
                    "histogramBase": 0,
                },
                "plot_1": {
                    // Output name will be displayed in the Style window
                    "title": "Prediction Lower Bound",
                    "histogramBase": 0,
                },
                "plot_2": {
                    // Output name will be displayed in the Style window
                    "title": "Prediction",
                    "histogramBase": 0,
                }
            },
            "inputs": [],
        },

        constructor: function() {
            this.init = function(context, inputCallback) {
                this._context = context;
                this._input = inputCallback;

                var symbol = "#PREDICTION";
                this._context.new_sym(symbol, PineJS.Std.period(this._context), PineJS.Std.period(this._context));
            };

            this.main = function(context, inputCallback) {
                this._context = context;
                this._input = inputCallback;

                this._context.select_sym(1);

                var v = PineJS.Std.close(this._context);
                return [v];
            }
        }
    }
];