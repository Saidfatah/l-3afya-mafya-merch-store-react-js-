const router = require('express').Router();
const axios = require('axios')

router.post('/',async (req,res)=>{
     console.log('checking capotcha ')
     console.log(req.body)
     try {
        const capotchaResponse = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${req.body.token}`,
            {},
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
              },
            },
          );
          console.log(capotchaResponse)
    } catch (error) {
        
    }
})


module.exports = router