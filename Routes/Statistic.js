const router = require('express').Router()
const {getTypeUser,getNewOrganizer,ShowEventsparCategory,UPCOMING_EVENTS
    ,EVENTS_Pert,ShowEventsparCategory2,newUsersEachMonth,
    newEvntsEachMonth,newInvitationsEachMonth,
    EVENTS_Pert_Organizer,TicketSalesEachMonth,
    PriceEachMonth,MaxReviews} = require('../controllers/Statistic')

router.get('/TypeStat',getTypeUser)
router.get('/MaxReviews',MaxReviews)
router.get('/TicketSalesEachMonth/:id',TicketSalesEachMonth)
router.get('/PriceEachMonth/:id',PriceEachMonth)
router.get('/NewOrganazer',getNewOrganizer)
router.get('/CatEventStat/:id',ShowEventsparCategory)
router.get('/UPCOMING_EVENTS',UPCOMING_EVENTS)
router.get('/ShowEventsparCategory2',ShowEventsparCategory2)
router.get('/EVENTS_Pert',EVENTS_Pert)
router.get('/EVENTS_Pert_Organizer/:id',EVENTS_Pert_Organizer)
router.get('/newUsersEachMonth',newUsersEachMonth)
router.get('/newEvntsEachMonth',newEvntsEachMonth)
router.get('/newInvitationsEachMonth',newInvitationsEachMonth)
module.exports = router