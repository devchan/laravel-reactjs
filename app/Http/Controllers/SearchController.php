<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function searchUsers(Request $request)
    {

        $data = $this->getUsers();

        if ($request->field == 'tags') {
            $tags = $request->q;

            $user = $data->filter(function ($collection) use ($tags) {
                return in_array($tags, $collection->tags);
            })->first();

            //return response()->json($inPages, 200);
        } else {
            $user = $data->where($request->field, $request->q)->first();
        }

        $organizations = $this->getOrganizations();

        $tickets = $this->getTickets();

        $organization =  $organizations->where('_id', $user->organization_id)->first();

        $submitter_ticket =  $tickets->where('submitter_id', $user->_id)->first();

        $assignee_ticket =  $tickets->where('assignee_id', $user->_id)->first();

        $res['user_name'] = $user->name ?? '-';

        $res['organization_name'] = $organization->name ?? '-';

        $res['submitter_ticket_subject'] = $submitter_ticket->subject ?? '-';

        $res['assignee_ticket_subject'] = $assignee_ticket->subject ?? '-';



        return response()->json($res, 200);
    }

    public function searchOrganizations(Request $request)
    {
        $data = $this->getOrganizations();

        if ($request->field == 'tags') {
            $tags = $request->q;

            $organization = $data->filter(function ($collection) use ($tags) {
                return in_array($tags, $collection->tags);
            })->first();

            //return response()->json($inPages, 200);
        } else if ($request->field == 'domain_names') {
            $domain_names = $request->q;

            $organization = $data->filter(function ($collection) use ($domain_names) {
                return in_array($domain_names, $collection->domain_names);
            })->first();

            //return response()->json($inPages, 200);
        } else {
            $organization = $data->where($request->field, $request->q)->first();
        }

        $tickets = $this->getTickets();

        $ticket =  $tickets->where('organization_id', $organization->_id)->first();

        $users = $this->getUsers();

        $res['organization_name'] = $organization->name ?? '-';

        $res['ticket_subject'] = $ticket->subject ?? '-';

        $res['users'] = $users->where('organization_id', $organization->_id)->pluck('name', '_id');

        return response()->json($res, 200);
    }

    public function searchTickets(Request $request)
    {
        $data = $this->getTickets();

        if ($request->field == 'tags') {
            $tags = $request->q;

            $ticket = $data->filter(function ($collection) use ($tags) {
                return in_array($tags, $collection->tags);
            })->first();

            //return response()->json($inPages, 200);
        } else {
            $ticket = $data->where($request->field, $request->q)->first();
        }

        $res['ticket_subject'] = $ticket->subject ?? '-';

        $organizations = $this->getOrganizations();

        $organization = $organizations->where('_id', $ticket->organization_id)->first();

        $res['organization_name'] = $organization->name ?? '-';

        $users = $this->getUsers();

        $assignee = $users->where('_id', $ticket->assignee_id)->first();

        $submitter = $users->where('_id', $ticket->submitter_id)->first();

        $res['assignee_name'] = $assignee->name ?? '-';

        $res['submitter_name'] = $submitter->name ?? '-';

        return response()->json($res, 200);
    }


    public function users()
    {
        $url = storage_path('JsonStore/users.json');
        $datos = file_get_contents($url);
        $data = json_decode($datos, true);

        $keys = array_keys($data[0]);

        foreach ($keys as $key => $keyV) {
            $res[$key] = $keyV;
        }

        return response()->json($res, 200);
    }

    public function organizations()
    {

        $url = storage_path('JsonStore/organizations.json');
        $datos = file_get_contents($url);
        $data = json_decode($datos, true);

        $keys = array_keys($data[0]);

        return response()->json($keys, 200);
    }

    public function tickets()
    {

        $url = storage_path('JsonStore/tickets.json');
        $datos = file_get_contents($url);
        $data = json_decode($datos, true);

        $keys = array_keys($data[0]);

        return response()->json($keys, 200);
    }

    private function getTickets()
    {
        $url = storage_path('JsonStore/tickets.json');
        $datos = file_get_contents($url);
        $data = json_decode($datos);

        $data = collect($data);

        return $data;
    }

    private function getOrganizations()
    {
        $url = storage_path('JsonStore/organizations.json');
        $datos = file_get_contents($url);
        $data = json_decode($datos);

        $data = collect($data);

        return $data;
    }

    private function getUsers()
    {
        $url = storage_path('JsonStore/users.json');
        $datos = file_get_contents($url);
        $data = json_decode($datos);

        $data = collect($data);

        return $data;
    }
}
