<script setup>
import { Link } from '@inertiajs/inertia-vue3';
const props = defineProps(['active']);

</script>
<template>
  <div class="l-navbar bg-dark  p-0" id="nav-bar">
    <nav class="nav">
      <div>
        <Link href="#" class="nav_logo bg_primary" style="padding:14.6px 10px;">
          <i class="bx bx-layer nav_logo-icon"></i>
          <span style="font-size:1.4em;" class="nav_logo-name">ECMS <i class="bi bi-megaphone-fill text-white"></i></span>
        </Link>
        <div class="nav_list pr-2" >            
          <Link v-if="$page.props.auth.user.role=='admin'" href="/xdashboard"  data-toggle="tooltip" data-placement="top" title="Dashboard" :class="['nav_link',( active =='Dashboard'?'active':'')]">
            <i class="nav_ico ico-org bi-speedometer2 h5 pl-2"></i>
            <span class="nav_name hidename">Dashboard</span>
          </Link>
          <Link v-if="$page.props.auth.user.role=='admin'" href="area_list" data-toggle="tooltip" data-placement="top" title="Area List" :class="['nav_link',( active =='Area'?'active':'')]">
            <i class="nav_ico ico-org bi-stack h5 pl-2"></i>
            <span class="nav_name hidename">Area List</span>
          </Link>
          <Link v-if="$page.props.auth.user.role=='admin'" href="volunteer_management" data-toggle="tooltip" data-placement="top" title="Volunteers" :class="['nav_link',( active =='Volunteer'?'active':'')]">
            <i class="nav_ico ico-org bi-person-bounding-box h5 pl-2"></i>
            <span class="nav_name hidename">Users Management</span>
          </Link>
          <Link v-if="$page.props.auth.user.role=='admin'" href="voter_database" data-toggle="tooltip" data-placement="top" title="Voters" :class="['nav_link',( active =='Voter'?'active':'')]">
            <i class="nav_ico ico-org bi-people-fill h5 pl-2"></i>
            <span class="nav_name hidename">Voter Database</span>
          </Link>
          <Link v-if="$page.props.auth.user.role=='admin'" href="team" data-toggle="tooltip" data-placement="top" title="Teams" :class="['nav_link',( active =='Team'?'active':'')]">
            <i class="nav_ico ico-org bi-people-fill h5 pl-2"></i>
            <span class="nav_name hidename">Team</span>
          </Link>
          <Link v-if="$page.props.auth.user.role=='admin'" href="event" data-toggle="tooltip" data-placement="top" title="Events" :class="['nav_link',( active =='Event'?'active':'')]">
            <i class="nav_ico ico-org bi-calendar-plus h5 pl-2"></i>
            <span class="nav_name hidename">Event</span>
          </Link>
          <Link v-if="$page.props.auth.user.role=='admin'" href="campaign_analysis" data-toggle="tooltip" data-placement="top" title="Campaign Analysis" :class="['nav_link',( active =='Campaign'?'active':'')]">
            <i class="nav_ico ico-org bi-stack h5 pl-2"></i>
            <span class="nav_name hidename">Campaign Analysis</span>
          </Link>
          <Link v-if="$page.props.auth.user.role=='admin'" href="expenses" data-toggle="tooltip" data-placement="top" title="Expenses" :class="['nav_link',( active =='Expenses'?'active':'')]">
            <i class="nav_ico ico-org bi-wallet-fill h5 pl-2"></i>
            <span class="nav_name hidename">Expenses</span>
          </Link>
          <Link href="data-upload" data-toggle="tooltip" data-placement="top" title="data upload" :class="['nav_link',( active =='data upload'?'active':'')]">
            <i class="nav_ico ico-org bi-file-earmark-plus h5 pl-2"></i>
            <span class="nav_name hidename">Data Upload</span>
          </Link>
          <Link href="chats" data-toggle="tooltip" data-placement="top" title="Chart" :class="['nav_link',( active =='Chats'?'active':'')]">
            <i class="nav_ico ico-org bi-chat-right-dots-fill h5 pl-2"></i>
            <span class="nav_name hidename">Chats</span>
          </Link>
          <Link v-if="$page.props.auth.user.role=='admin'" href="sms" data-toggle="tooltip" data-placement="top" title="SMS" :class="['nav_link',( active =='SMS'?'active':'')]">
            <i class="nav_ico ico-org bi-envelope-fill h5 pl-2"></i>
            <span class="nav_name hidename">SMS</span>
          </Link>
          <Link v-if="$page.props.auth.user.role=='admin'" href="settings" data-toggle="tooltip" data-placement="top" title="Settings" :class="['nav_link',( active =='Settings'?'active':'')]">
            <i class="nav_ico ico-org bi-gear h5 pl-2"></i>
            <span class="nav_name hidename">Settings</span>
          </Link>
         
          
          <Link :href="route('logout')" method="get" class="nav_link">
            <i class="nav_ico ico-org bi bi-box-arrow-in-right h5  pl-2 nav_icon"></i>
            <span class="nav_name hidename">SignOut</span>
          </Link>
          
        </div>
      </div>
    </nav>
  </div>
</template>