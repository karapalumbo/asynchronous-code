from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False


@app.route("/")
def homepage():
    """Show homepage."""

    return render_template("index.html")


@app.route("/api/get-fave-num", methods=["POST"])
def get_fave_num():
    """Show favorite numbers."""
    
    js_data = request.json["data"]
    return js_data
