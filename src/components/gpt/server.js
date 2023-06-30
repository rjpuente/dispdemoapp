const openai = new OpenAiApi(config)

const app = express();


app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async(req,res) => {
    
})